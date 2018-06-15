'use strict';

// Chris Joakim, Microsoft, 2018/06/10

const fs      = require('fs');
const os      = require('os');
const request = require('request');
const hosts   = require("./hosts.json");
const RedisUtil = require('./lib/redis_util').RedisUtil;

class Main {

    constructor() {
        this.request_urls = [];
        this.current_request_idx = -1;
        this.responses = [];
    }

    execute() {
        if (process.argv.length < 2) {
            console.log('error: too few command-line args provided.');
            process.exit();
        }
        else {
            var funct = process.argv[2];

            switch (funct) {
                case 'gen_hostinfo_file':
                    this.gen_hostinfo_file();
                    break;
                case 'redis_get':
                    var key = process.argv[3];
                    this.redis_get(key);
                    break;
                case 'redis_set':
                    var key = process.argv[3];
                    this.redis_set(key);
                    break;
                case 'ping_servers':
                    this.ping_servers();
                    break;
                case 'env_servers':
                    this.env_servers();
                    break;
                case 'shutdown_servers':
                    this.shutdown_servers();
                    break;
                case 'parse_arm_parameters':
                    this.parse_arm_parameters();
                    break;
                case 'parse_arm_template':
                    this.parse_arm_template();
                    break;
                default:
                    console.log('error: unknown function - ' + funct);
            }
        }
    }

    gen_hostinfo_file() {
        console.log('gen_hostinfo_file...');
        var info = {};
        info['hostname'] = os.hostname();
        var jstr = JSON.stringify(info, null, 2);
        console.log(jstr);
        fs.writeFileSync('hostinfo.json', jstr);
    }

    redis_get(key) {
        var util = new RedisUtil();
        util.on('done', (evt_obj) => {
            console.log(JSON.stringify(evt_obj, null, 2));
            var reply = evt_obj.reply;
            console.log(reply);
            util.quit();
        });
        util.get(key, 'unused');
    }

    redis_set(key) {
        var obj = {};
        var date = new Date();
        obj.hostname = os.hostname();
        obj.date = date;
        obj.epoch = date.getTime();
        var jstr = JSON.stringify(obj, null, 2);

        var util = new RedisUtil();
        util.on('done', (evt_obj) => {
            console.log(JSON.stringify(evt_obj, null, 2));
            util.quit();
        });
        util.set(key, jstr);
    }

    ping_servers() {
        var hosts_to_ping = [];
        var port = process.env.AZURE_ATW_WEBAPP_PORT;
        var code = process.env.AZURE_ATW_WEBAPP_CODE;

        for (var i = 0; i < process.argv.length; i++) {
            for (var h = 0; h < hosts.length; h++) {
                var host = hosts[h];
                if (host.abbrev === process.argv[i].toUpperCase()) {
                    hosts_to_ping.push(host);
                }
            }
        }
        for (var i = 0; i < hosts_to_ping.length; i++) {
            var host = hosts_to_ping[i];
            var url  = "http://" + host.ip + ":" + port + "/admin/ping";
            console.log(url);
            var options = {uri: url, method: 'GET'};
            request(options, function(err, res) {
                if (err != null) {
                    console.log(err);
                }
                else {
                    console.log(res.body);
                }
            });
        }
    }

    env_servers() {
        var hosts_to_get = [];
        var port = process.env.AZURE_ATW_WEBAPP_PORT;
        var code = process.env.AZURE_ATW_WEBAPP_CODE;

        for (var i = 0; i < process.argv.length; i++) {
            for (var h = 0; h < hosts.length; h++) {
                var host = hosts[h];
                if (host.abbrev === process.argv[i].toUpperCase()) {
                    hosts_to_get.push(host);
                }
            }
        }
        for (var i = 0; i < hosts_to_get.length; i++) {
            var host = hosts_to_get[i];
            var url  = "http://" + host.ip + ":" + port + "/admin/env/" + code;
            console.log(url);
            var options = {uri: url, method: 'GET'};
            request(options, function(err, res) {
                if (err != null) {
                    console.log(err);
                }
                else {
                    console.log(res.body);
                    var obj = JSON.parse(res.body);
                    console.log(JSON.stringify(obj, null, 2));
                }
            });
        }
    }

    shutdown_servers() {
        var hosts_to_shutdown = [];
        var port = process.env.AZURE_ATW_WEBAPP_PORT;
        var code = process.env.AZURE_ATW_WEBAPP_CODE;

        for (var i = 0; i < process.argv.length; i++) {
            for (var h = 0; h < hosts.length; h++) {
                var host = hosts[h];
                if (host.abbrev === process.argv[i].toUpperCase()) {
                    hosts_to_shutdown.push(host);
                }
            }
        }
        for (var i = 0; i < hosts_to_shutdown.length; i++) {
            var host = hosts_to_shutdown[i];
            var url  = "http://" + host.ip + ":" + port + "/admin/shutdown/" + code;
            console.log(url);
            var options = {uri: url, method: 'GET'};
            request(options, function(err, res) {
                if (err != null) {
                    console.log(err);
                }
                else {
                    console.log(res.body);
                }
            });
        }
    }

}

new Main().execute();

// node main.js gen_hostinfo_file
// node main.js ping_servers use weu cin jpe
// node main.js env_servers use weu cin jpe
// node main.js shutdown_servers loc use weu cin jpe
// node main.js redis_set cjoakimldsvmuse
// node main.js redis_get T-20180610-1511
