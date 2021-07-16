var mysql = require('mysql');

var conn = mysql.createPool({
    host: 'care4cf-db.mysql.database.azure.com',
    user: 'ucabjjw@care4cf-db',
    password: 'Jordan2016Smith',
    database: 'care4cf_private',
    port: 3306,
    ssl: true
}); 

// conn.connect(function(err) {
//   if (err) throw err;
//   console.log('Database is connected successfully !');
// });

module.exports = conn;