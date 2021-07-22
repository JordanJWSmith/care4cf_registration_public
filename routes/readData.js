var db = require('../database');

module.exports = function readData(query){
    return new Promise( ( resolve, reject ) => {
        db.query( query, ( err, rows ) => {
            if ( err )
                return reject( err );
            // console.log('rows: ', rows);
            resolve( rows );
        } );
    } );
   
};