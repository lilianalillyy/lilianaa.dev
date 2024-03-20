const { authOrRedirect } = require("../auth");
const fp = require("fastify-plugin");
const { getCachedSpreadsheetData, getSpreadsheetData } = require("../spreadsheet");

module.exports.viewSpreadsheet = fp(async (app) => {
    app.get('/spreadsheet/:spreadsheetId', authOrRedirect(async (req, res) => {
        try {
            const { spreadsheetId } = req.params;

            const data = app.cache 
                ? await getCachedSpreadsheetData(app.cache, spreadsheetId) 
                : await getSpreadsheetData(spreadsheetId);

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