const fp = require("fastify-plugin");
const { getCachedSpreadsheetData, getSpreadsheetData } = require("../spreadsheet");
const fastifyBasicAuth = require("@fastify/basic-auth");
const config = require("../../config");

module.exports.viewPublicSheet = fp(async (app) => {
    app.register(fastifyBasicAuth, {
        validate: async (username, password, req, res) => {
            const sheetId = req.params.sheetId;

            if (!sheetId) {
                return new Error("Sheet id is missing while authenticating")
            }

            const sheetData = config.publicSheets[sheetId] ?? null;

            if (!sheetData) {
                return new Error("Invalid sheet");
            }

            if (!sheetData.credentials) {
                return;
            }

            if (sheetData.credentials.length < 2) {
                return new Error("Invalid sheet data");
            }

            const [expectedUsername, expectedPassword] = sheetData.credentials;

            if (username !== expectedUsername || password !== expectedPassword) {
                return new Error("Invalid credentials");
            }
        }
    })

    app.get('/shared-sheet/:sheetId', { onRequest: app.basicAuth }, async (req, res) => {
        const publicSheet = config.publicSheets[req.params.sheetId];

        if (!publicSheet) {
            return res.status(404).send("Sheet not found");
        }
        try {
            const { spreadsheetId, filterData = (data) => data } = publicSheet;

            const data = app.cache
                ? await getCachedSpreadsheetData(app.cache, spreadsheetId, { fetchIfNotFound: true, filterData })
                : await getSpreadsheetData(spreadsheetId);

            return res.view("sheet", {
                ...data,
                user: req.userInfo
            });
        } catch (e) {
            console.log("failed to create sheet", { e });
            res.send({ message: "internal server error" })
        }
    });
});