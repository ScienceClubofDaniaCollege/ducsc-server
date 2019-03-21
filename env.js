const config = require('config');
function all(){
console.log('port: '+process.env.PORT);
console.log('all: '+process);
console.log('NODE_ENV: '+process.env.NODE_ENV);
console.log('DB: '+process.env.DSC_db);
console.log('Name: '+config.get('name'));
}
exports.all= all;