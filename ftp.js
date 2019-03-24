var JSFtp = require("jsftp");
var fs = require("fs");
var Ftp = new JSFtp({
    host: 'ftpupload.net',
    user: 'b32_23532555',
    pass: 'Ak338899'
});

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
                    console.log("File uploaded successfuly");
                    listFiles();
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