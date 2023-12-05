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

module.exports.AbstractCachePromise = class AbstractCachePromise {
    cache;

    constructor(cache) {
        this.cache = cache;
    }

    get(key) {
        return this._promisify(this.cache.get, key);
    }

    set(key, value, timeToLive) {
        return this._promisify(this.cache.get, key, value, timeToLive);
    }

    _promisify(fn, ...params) {
        return new Promise((resolve, reject) => {
            fn(...params, (err, result) => {
                if (err) {
                    reject(err);
                }

                resolve(result);
            })
        })
    }
}