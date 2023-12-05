const { authOrRedirect } = require("../auth");
const fp = require("fastify-plugin");
const { AbstractCachePromise } = require("../cache");
const { getSpreadsheetData } = require("../spreadsheet");

module.exports.viewSpreadsheet = fp(async (app) => {
    const cache = app.cache ? new AbstractCachePromise(app.cache) : null;

    app.get('/spreadsheet/:spreadsheetId', authOrRedirect(async (req, res) => {
        try {
            const { spreadsheetId } = req.params;

            if (cache) {
                let cachedData = await cache.get(`spreadsheet:${spreadsheetId}`);

                if (cachedData) {
                    cachedData = typeof cachedData === "string" ? JSON.parse(cachedData) : cachedData;
                    return res.view("sheet", {
                        ...cachedData,
                        user: req.userInfo
                    });
                }
            }

            const data = await getSpreadsheetData(spreadsheetId);
            cache && await cache.set(`spreadsheet:${spreadsheetId}`, JSON.stringify(data), 5 * 60 * 1000)

            return res.view("sheet", {
                ...data,
                user: req.userInfo
            });
        } catch (e) {
            console.log("failed to create sheet", { e });
            res.send({ message: "internal server error" })
        }
    }));
});