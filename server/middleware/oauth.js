require("dotenv").config();
const redirect = require("../controllers/redirect.controller");

const url = 'https://oauth.teleperformance.co/api/';

function login(req, res) {

    // return
    // const newBody = {
    //     user : req.body.body.id,
    //     pass : req.body.body.password,
    // }

    // const btoaData = btoa(JSON.stringify(newBody));
    // const bdata = {body: 's'+ btoaData};

    let data = {
        body: req.body.body,
        timeTkn: 100,
        project: process.env.PROJECT,
        ip: req.clientIp,
        uri: req.originalUrl,
        size: req.headers["content-length"],
    };
    redirect
        .post(url, "oauthlogin", data, null)
        .then((result) => {
            res.cookie(req.csrfToken());
            responsep(1, req, res, result.data.data);
        })
        .catch((error) => {
            console.log(error);
            responsep(2, req, res, error);
        });
}
 
function refresh(req, res) {
    let data = {
        body: req.body,
        project: process.env.PROJECT,
        ip: req.clientIp,
        uri: req.originalUrl,
        size: req.headers["content-length"],
    };
    redirect
        .post(url, "oauthrefresh", data, req.headers.authorization.split(" ")[1])
        .then((result) => {
            responsep(1, req, res, result.data.data);
        })
        .catch((error) => {
            responsep(3, req, res, error);
        });
}

let responsep = (tipo, req, res, resultado) => {
    return new Promise((resolve, reject) => {
        let date = new Date();
        if (tipo == 1) {
            res.status(200).json(resultado);
            resolve(200);
        } else if (tipo == 2) {
            console.log("Error at:", date, "res: ", resultado.msg);
            res.status(404).json(resultado.msg);
            resolve(404);
        } else if (tipo == 3) {
            res.status(401).json(resultado);
            resolve(401);
        }
    });
};

function oauthOther(req, res, next) {
    let data = {
        project: process.env.PROJECT,
        ip: req.clientIp,
        uri: req.originalUrl,
        size: req.headers["content-length"],
    };
    redirect
        .post(url, "oauthothers", data, req.headers.authorization.split(" ")[1])
        .then((result) => {
            if (result.status == 200) {
                next();
            }
        })
        .catch((error) => {
            console.log(error);
            responsep(2, req, res, error);
        });
}

module.exports = { oauthOther, refresh, login };