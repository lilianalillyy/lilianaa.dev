const { GoogleSpreadsheet } = require("google-spreadsheet");
const { randomUUID } = require("crypto");
const { mkdirSync, readFileSync, existsSync } = require("fs");
const { sync: glob } = require("glob");
const { streamToFile, cleanupTemp } = require("./utils");
const { googleAuthClient } = require("./google");
const { TEMP_DIR } = require("./constants");
const decompress = require("decompress");
const path = require("path");

const getSpreadsheetData = async (spreadsheetId) => {
    let zipFile = null;
    let tempDir = null;
    try {
        const sheet = new GoogleSpreadsheet(spreadsheetId, googleAuthClient);
        await sheet.loadInfo(true);

        const uuid = randomUUID();

        zipFile = path.join(TEMP_DIR, `${uuid}.zip`);

        tempDir = path.join(TEMP_DIR, uuid);
        mkdirSync(tempDir);

        const zipStream = await sheet.downloadAsZippedHTML(true);
        await streamToFile(zipStream, zipFile);

        await decompress(zipFile, tempDir);

        let sheets = {};

        const htmlFilesPath = path.join(tempDir, "*.html");
        const htmlFiles = glob(htmlFilesPath);

        for (const htmlFile of htmlFiles) {
            const name = path.basename(htmlFile, path.extname(htmlFile))
            const html = readFileSync(htmlFile, "utf-8");

            sheets[name] = {
                html,
            };
        }

        const cssPath = path.join(tempDir, "resources", "sheet.css");
        let css = null;

        if (existsSync(cssPath)) {
            css = readFileSync(cssPath, "utf-8");
        }

        await cleanupTemp(zipFile, tempDir);

        const data = {
            title: spreadsheetId,
            sheets,
            css,
        };

        return data
    } catch (e) {
        await cleanupTemp(zipFile, tempDir)
        console.log(`failed to fetch spreadsheet ${spreadsheetId}`, { e });
    }
}

const getCachedSpreadsheetData = async (cache, spreadsheetId, { fetchIfNotFound = true, filterData = (data) => data } = {}) => {
    let data = null;

    if (cache) {
        let cachedData = (await cache.get(`spreadsheet:${spreadsheetId}`))?.item;

        if (cachedData) {
            data = typeof cachedData === "string" ? JSON.parse(cachedData) : cachedData;
        }
    }

    if (!data && fetchIfNotFound) {
        data = await getSpreadsheetData(spreadsheetId);
        cache && await cache.set(`spreadsheet:${spreadsheetId}`, JSON.stringify(data), 5 * 60 * 1000)
    }

    if (data && typeof filterData === "function") {
        data = filterData(data);
    }

    return data;
}

module.exports = {
    getSpreadsheetData,
    getCachedSpreadsheetData,
}