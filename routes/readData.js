var db = require('../database');

// Query the database, return the results
module.exports = function readData(query, data){
    return new Promise( ( resolve, reject ) => {
        db.query( query, data, ( err, rows ) => {
            if ( err )
                return reject( err );
            resolve( rows );
        } );
    } );
   
};