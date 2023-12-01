const { auth } = require("express-openid-connect");
const { auth: authConfig } = require("../config");

const expressAuth = auth(authConfig);

function authOrRedirect(req, res, next) {
    if (!req.oidc.isAuthenticated()) {
        return res.redirect("/login");
    }

    next();
}

module.exports = {
    expressAuth,
    authOrRedirect,
}
