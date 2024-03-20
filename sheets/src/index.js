const fastify = require('fastify');
const fastifyCors = require("@fastify/cors");
const fastifyView = require("@fastify/view");
const fastifyCaching = require("@fastify/caching");
const fastifySession = require("@fastify/secure-session");
const { Liquid } = require("liquidjs");
const { googleAuthClient } = require("./google");
const { viewSpreadsheet } = require('./routes/viewSpreadsheet');
const { viewPublicSheet } = require('./routes/viewPublicSheet');
const { getUserInfo } = require('./routes/getUserInfo');
const { PORT, TEMPLATES_DIR, SESSION_SECRET_PATH } = require('./constants');
const { corsOrigin = "*", cookies, redis } = require('../config');
const { authPlugin, createSecret } = require('./auth');
const { existsSync, readFileSync } = require("fs");
const { createRedis, createAbstractCache } = require('./cache');

const AUTHENTICATED_ROUTES = [
    getUserInfo,
    viewSpreadsheet,
    viewPublicSheet,
]

const createServer = async () => {
    const app = fastify();

    await app.register(fastifyCors, {
        origin: corsOrigin,
    });

    if (!existsSync(SESSION_SECRET_PATH)) {
        createSecret(SESSION_SECRET_PATH);
    }

    await app.register(fastifySession, {
        cookieName: '_sheets.session',
        key: readFileSync(SESSION_SECRET_PATH),
        cookie: cookies,
    });

    await app.register(fastifyView, {
        engine: {
            liquid: new Liquid({
                extname: ".liquid",
            }),
        },
        root: TEMPLATES_DIR,
    });

    await app.register(authPlugin);

    if (redis.enable) {
        const [redisDriver] = createRedis();
        const cache = createAbstractCache(redisDriver);
    
        await app.register(fastifyCaching, { cache });
    }

    AUTHENTICATED_ROUTES.forEach((route) => app.register(route));

    return app;
}

const run = async () => {
    await googleAuthClient.authorize();

    const app = await createServer();

    await app.listen({
        port: PORT
    });

    console.log(`server running at :${PORT}`);
};

run();