const mysql = require('mysql');

var config =
{
    host: 'care4cf-js.mysql.database.azure.com',
    user: 'ucabjjw@care4cf-js',
    password: 'Jordan2016Smith',
    database: 'care4cf-test',
    port: 3306,
    ssl: true
};

const conn = new mysql.createConnection(config);

conn.connect(
    function (err) { 
        if (err) { 
            console.log("!!! Cannot connect !!! Error:");
            throw err;
        }
        else {
            console.log("Connection established.");
            readData();
        }
    });

function readData(){
    conn.query('SELECT * FROM inventory', 
        function (err, results, fields) {
            if (err) throw err;
            else console.log('Selected ' + results.length + ' row(s).');
            for (i = 0; i < results.length; i++) {
                console.log('Row: ' + JSON.stringify(results[i]));
            }
            console.log('Done.');
        })
    conn.end(
        function (err) { 
            if (err) throw err;
            else  console.log('Closing connection.') 
    });
};