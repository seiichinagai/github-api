'use strict'
const AWS = require('aws-sdk');
AWS.config.update({ region: "us-west-2"});
const https = require('https');

exports.handler = async (event, context) => {
    let responseBody = {}, repos = [], data;
    let statusCode = 200;

    const { url } = JSON.parse(event.body);
    let base_url = url.substring(url.indexOf('api.'),url.indexOf('.com')+4);
    let path = url.substring(url.indexOf('.com')+4) + 'pulls';

    console.log(url);

    try {
        data = (await getOpenRepos(base_url,path)).toString();
    } catch(repoErr){
        statusCode = 400;
    }

    try {
        repos = JSON.parse(data);
    } catch(jsonErr){
        console.log(jsonErr);
        statusCode = 400;
    }

    if(repos.length > 0){
        responseBody['openRepos'] = [];
        await Promise.all(repos.map(async repo => {
            if(repo.commits_url){
                responseBody['openRepos'].push({
                    "repoNumber": repo.number,
                    "numberCommits": await getNumCommits(base_url,path,repo.number)
                });
            }
        }));
    }
    const response = {
        statusCode: statusCode,
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(responseBody),
        isBase64Encoded: false
    }
    return response;
}

function getOpenRepos(base_url,path) {
    return new Promise(((resolve, reject) => {
        const options = {
            hostname: base_url,
            port: 443,
            path: path + '?state=open',
            method: 'GET',
            headers: {
                'user-agent': 'node.js'
            }
        }
        const req = https.request(options, (res) => {
            var body = [];
            res.on('data', (d) => {
                body.push(d);
            });
            res.on('end', function() {
                try {
                    body = Buffer.concat(body).toString();
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (error) => {
            console.log(error);
            reject(error);
        });
        req.end();
    }));
}

function getNumCommits(base_url,path,repo_num) {

    console.log(base_url + path + '/' + repo_num + '/commits');

    return new Promise(((resolve, reject) => {
        const options = {
            hostname: base_url,
            port: 443,
            path: path + '/' + repo_num + '/commits',
            method: 'GET',
            headers: {
                'user-agent': 'node.js'
            }
        }
        const req = https.request(options, (res) => {
            console.log(res.statusCode);

            var body = [];
            res.on('data', (d) => {
                body.push(d);
            });
            res.on('end', function() {
                try {
                    body = JSON.parse(Buffer.concat(body).toString()).length;
                } catch(e) {
                    reject(e);
                }
                resolve(body);
            });
        });
        req.on('error', (error) => {
            console.log(error);
            reject(error);
        });
        req.end();
    }));
}