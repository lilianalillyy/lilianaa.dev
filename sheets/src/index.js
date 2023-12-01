const { google } = require("googleapis");
const { GoogleSpreadsheet } = require("google-spreadsheet");
const { randomUUID } = require("crypto");
const { mkdirSync, readFileSync, existsSync } = require("fs");
const { sync: glob } = require("glob");
const { Liquid } = require("liquidjs");
const { streamToFile, cleanupTemp } = require("./utils");
const express = require('express');
const path = require("path");
const decompress = require("decompress");

const keys = require("../auth.json");
const { expressAuth, authOrRedirect } = require("./auth");

const PORT = 3000;

const TEMP_DIR = path.join(__dirname, "..", "temp");
const TEMPLATES_DIR = path.join(__dirname, "..", "templates");

const googleJwt = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);


const app = express();

const liquid = new Liquid({
    extname: ".liquid",
});

app.engine('liquid', liquid.express());
app.set('views', TEMPLATES_DIR);
app.set('view engine', 'liquid');

app.use(expressAuth);

app.get("/user", authOrRedirect, async (req, res) => {
    const userInfo = await req.oidc.fetchUserInfo();
    return res.send({
        user: req.oidc.idTokenClaims,
        userInfo,
    })
})

app.get('/spreadsheet/:spreadsheetId', authOrRedirect, async (req, res) => {
    let zipFile = null;
    let tempDir = null;

    try {
        const { spreadsheetId } = req.params;

        const sheet = new GoogleSpreadsheet(spreadsheetId, googleJwt);
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

        cleanupTemp(zipFile, tempDir);

        const data = {
            title: spreadsheetId,
            sheets,
            css,
            user: req.oidc.user,
        };


        return res.render("sheet", data);
    } catch (e) {
        cleanupTemp(zipFile, tempDir)
        res.send({ message: "internal server error" })
    }
});

const run = async () => {
    await googleJwt.authorize();

    await app.listen(PORT);

    console.log(`http://localhost:3000/spreadsheet/19jz2yxiNX-m9fbD7ncxHr2oaoJxcb5mutfzAOqhXQ1k`);
}

run();