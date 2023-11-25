const db = require('../shakib/database');

const ViewController = {
    Index: (req, res) => {
        const fileid = req.params.id;
        const _NAME = process.env.NAME || "SHAKIB LINK PROTECTOR";
        const _URL = process.env.URL || "http://localhost:3001";
        const regExUrl = /(ftp|https?):\/\/(\w+:?\w*@)?([^\s]+)(:[0-9]+)?(\/[^\s]*)?/g;
        
        db.query(`SELECT * FROM urls WHERE fid = '${fileid}'`, (error, result) => {
            if (!error && result.length > 0) {
                db.query(`UPDATE urls SET hits = hits + 1 WHERE fid = '${fileid}'`, (updateError) => {
                    if (!updateError) {
                        const content = result[0].content;
                        const updatedContent = content.replace(regExUrl, '<a href="$&" rel="external" target="_blank">$&</a></p>');
    
                        res.render('view', {
                            "_NAME": _NAME,
                            "_URL": _URL,
                            "_VIEW": updatedContent,
                            "_HIT": result[0].hits,
                            "db": result[0],
                            "post": req.body
                        });
                    } else {
                        res.status(500).send('Internal Server Error');
                    }
                });
            } else {
                res.status(404).send('Not Found');
            }
        });
    }
    
    
}

module.exports = ViewController;
