const { google } = require("googleapis");
const keys = require("../auth.json");

module.exports.googleAuthClient = new google.auth.JWT(
    keys.client_email,
    null,
    keys.private_key,
    ['https://www.googleapis.com/auth/spreadsheets']
);