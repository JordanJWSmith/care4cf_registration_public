var readData = require('./readData');

module.exports = async function(email) {

    if ( (typeof email !== "string")) {
        return false           
    } else {

        // var checkLogin = 'SELECT * FROM users WHERE email = "' + email + '"';
        var checkLogin =  "SELECT * FROM users WHERE email = ?";
        var data = [email];
        var results = await readData(checkLogin, data);
        // console.log('userExists results:', results);
        // console.log('userExists check: ', results.length > 0);

        return { 
           logIn: (results.length > 0),
           userID: (results[0].userID)
        //    fName: results[0].fName 
        }
    }
    
}