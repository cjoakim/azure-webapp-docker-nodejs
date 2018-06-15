'use strict';

const events = require('events');
const util   = require('util');
const redis  = require("redis");

// This utility class contains functions for invoking Azure RedisCache Storage.
// Chris Joakim, Microsoft, 2018/06/15

class RedisUtil extends events.EventEmitter {

    constructor() {
        super();
        var ns  = process.env.AZURE_REDISCACHE_NAMESPACE; 
        var key = process.env.AZURE_REDISCACHE_KEY;
        var server = ns + '.redis.cache.windows.net';
        var creds  = { auth_pass: key, tls: {servername: server}}
        this.client = redis.createClient(6380, server, creds);
    }

    set(key, val) {
        this.client.set(key, val, (err, reply) => {
            var evt_obj = {};
            evt_obj['type']  = 'RedisUtil:set';
            evt_obj['key']   = key;
            evt_obj['val']   = val;
            evt_obj['error'] = err;
            evt_obj['reply'] = reply;
            this.emit('done', evt_obj);
        });
    }

    get(key, val) {
        this.client.get(key, (err, reply) => {
            var evt_obj = {};
            evt_obj['type']  = 'RedisUtil:get';
            evt_obj['key']   = key;
            evt_obj['error'] = err;
            evt_obj['reply'] = reply;
            this.emit('done', evt_obj);
        });
    }

    quit() {
        return this.client.quit();
    }
}

module.exports.RedisUtil = RedisUtil;
