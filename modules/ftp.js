const config = require('config');
const JSFtp = require("jsftp");
const fs = require("fs");
const Ftp = new JSFtp(config.get('ftp')
// .then(()=> console.log('Connected to FTP...')
// .catch(()=> console.log('Could not connect to FTP...'))
);

const createDir = (dirname) => {
    Ftp.raw("mkd", dirname, (err, data) => {
        if (err) {
            return console.error(err);
        }
        console.log(data.text); // Show the FTP response text to the user
        console.log(data.code); // Show the FTP response code to the user
    });
}
const delFile = () => {

}
const putFile = (local, remote) => {
    fs.readFile(local, function(err, buffer) {
        if (err) {
            console.error(err);
            // callback(err);
        } else {
            Ftp.put(buffer, remote, function(err) {
                if (err) {
                    console.error(err);
                    // callback(err);
                } else {
                    console.log("Image uploaded to FTP...");
                }
            });
        }
    });
}

const listFiles = () => {
    Ftp.ls(".", (err, res) => {
        res.forEach(file => console.log(file.name));
    });
}

exports.listFiles = listFiles;
exports.putFile = putFile;
exports.createDir = createDir;