var readData = require('./readData');

module.exports = async function(email) {

    if ( (typeof email !== "string")) {
        return false           
    } else {

        var checkLogin = 'SELECT * FROM users WHERE email = "' + email + '"';
        var results = await readData(checkLogin);
        console.log('results:', results);
        console.log(results.length > 0);

        return { 
           logIn: (results.length > 0),
        //    fName: results[0].fName 
        }
    }
    
}