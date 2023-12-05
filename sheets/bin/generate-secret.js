const { existsSync } = require("fs");
const { SESSION_SECRET_PATH } = require("../src/constants");
const { createSecret } = require("../src/auth");

if (existsSync(SESSION_SECRET_PATH)) {
    console.log(SESSION_SECRET_PATH, "already exists");
    return;
}

createSecret(SESSION_SECRET_PATH);