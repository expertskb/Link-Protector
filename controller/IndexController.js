const db = require('../shakib/database');
const { randomString, isValidURL } = require('../shakib/function');

const IndexController = {
    getIndex: (req, res) => {
        const _NAME = process.env.NAME || "SHAKIB LINK PROTECTOR";
        const _URL = process.env.URL || "http://localhost:3001";
        res.render('index', {
            "_NAME": _NAME,
            "_URL": _URL
        })
    },
    postIndex: (req, res) => {

        const urls = req.body.urls || null;
        const password = req.body.password || null;
    
        const _NAME = process.env.NAME || "SHAKIB LINK PROTECTOR";
        const _URL = process.env.URL || "http://localhost:3001";
        const fid = randomString();
    
        if (isValidURL(urls)) { // Call isValidURL with the actual URL
    
            db.query("INSERT INTO urls (fid, content, password) VALUES (?, ?, ?)", [fid, urls, password], (err, result) => {
                if (err) {
                    res.render('index', {
                        "status": false,
                        "_NAME": _NAME,
                        "_URL": _URL,
                        "message": "Error! Server side problem."
                    });
                } else {
                    res.render('index', {
                        "status": true, // Change "false" to "true"
                        "_FID": _URL + '/' + fid,
                        "_NAME": _NAME,
                        "_URL": _URL,
                        "message": "Success"
                    });
                }
            });
        } else {
            res.render('index', {
                "status": false,
                "_NAME": _NAME,
                "_URL": _URL,
                "message": "Error! Make sure you entered a correct URL address."
            });
        }
    }
    

}

module.exports = IndexController;
