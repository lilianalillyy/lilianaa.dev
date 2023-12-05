const { auth: authConfig, baseURL, cookies } = require('../config');
const { writeFileSync } = require("fs");
const sodium = require("sodium-native");
const fastifyOAuth2 = require('@fastify/oauth2');
const fp = require('fastify-plugin');
const axios = require('axios');

const http = axios.create({
    baseURL: authConfig.issuerBaseURL,
})

const SESSION_ACCESS_TOKEN = "session.access_token";

module.exports.SESSION_ACCESS_TOKEN = SESSION_ACCESS_TOKEN;

const SESSION_AUTH_SUBJECT = "session.auth_subject";

module.exports.SESSION_AUTH_SUBJECT = SESSION_AUTH_SUBJECT;

const getUserInfo = async (token) => {
    const { data } = await http.request({
        url: '/userinfo',
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })

    return data;
}

module.exports.getUserInfo = getUserInfo;

module.exports.createSecret = (path) => {
    const buffer = Buffer.allocUnsafe(sodium.crypto_secretbox_KEYBYTES)
    sodium.randombytes_buf(buffer)
    writeFileSync(path, buffer)
}

module.exports.authPlugin = fp(async (app) => {
    app.register(fastifyOAuth2, {
        name: 'oidc',
        userAgent: 'sheets_liliana_digital',
        scope: authConfig.scope,
        credentials: {
            client: {
                id: authConfig.clientID,
                secret: authConfig.clientSecret,
            },
        },
        startRedirectPath: '/login',
        callbackUri: `${baseURL}/oauth/callback`,
        cookie: cookies,
        discovery: {
            issuer: authConfig.issuerBaseURL,
        },
        pkce: 'S256',
    })

    app.decorateRequest('userInfo', null);

    app.get('/oauth/callback', function (req, res) {
        console.log("callback")
        const success = () => res.redirect(authConfig.callbackRedirect ?? "/");

        const sendError = (error = 'failed to authenticate') => res.status(400).send({ error });

        this.oidc.getAccessTokenFromAuthorizationCodeFlow(req, res, (err, { token } = { token: null }) => {
            if (err || !token?.access_token) {
                return sendError('failed to retrieve an access token')
            }

            getUserInfo(token.access_token)
                .then((data) => {
                    req.session.set(SESSION_ACCESS_TOKEN, token.access_token)
                    req.userInfo = data;

                    success();
                })
                .catch(() => sendError());
        });
    })

    app.addHook('preHandler', async (req, res) => {
        const accessToken = req.session.get(SESSION_ACCESS_TOKEN)

        if (!accessToken) {
            return
        }

        try {
            const userInfo = await getUserInfo(accessToken)
            
            req.userInfo = userInfo;
            
            req.session.set(SESSION_AUTH_SUBJECT, userInfo.sub);
        } catch {
            return;
        }
    })
})

module.exports.authOrRedirect = (next) => async (req, res) => {
    if (!req.userInfo) {
        return res.redirect('/login');
    }

    return next(req, res);
}

module.exports.authOrFail = (next, fail = (_, res) => res.status(401).send({ error: "unauthenticated" })) => async (req, res) => {
    if (!req.userInfo) {
        return fail(req, res);
    }

    return next(req, res);
}
