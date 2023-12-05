const { port: configPort } = require("../config");
const path = require("path");

const PORT = process.env.PORT || configPort || 3000;

const TEMP_DIR = path.join(__dirname, "..", "temp");

const TEMPLATES_DIR = path.join(__dirname, "..", "templates");

const SESSION_SECRET_PATH = path.join(__dirname, "..", ".session_secret")

module.exports = {
    PORT,
    TEMP_DIR,
    TEMPLATES_DIR,
    SESSION_SECRET_PATH
}