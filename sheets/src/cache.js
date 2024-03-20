const abcache = require("abstract-cache");
const IORedis = require('ioredis');
const { redis: redisConfig } = require("../config");

module.exports.createRedis = (opts = {}) => {
    const client = new IORedis({
        ...redisConfig,
        ...opts
    });

    const driver = {
        name: 'abstract-cache-redis',
        options: {
            client, 
        },
    };

    return [driver, client];
}

module.exports.createAbstractCache = (driver) => {
    return abcache({
        useAwait: true,
        driver,
    })
}