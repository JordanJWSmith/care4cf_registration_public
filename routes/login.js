var readData = require('./readData');

module.exports = async function(cookieToken, email) {

    if ((typeof cookieToken !== "string") || (typeof email !== "string")) {
        return false           
    } else {

        var checkLogin = 'SELECT * FROM users WHERE email = "' + email + '"';
        var results = await readData(checkLogin);
        // console.log('results: ', results);

        if (results.length == 0) {
            return false
        }

        return { 
           logIn: (results[0].msalToken == cookieToken),
           fName: results[0].fName 
        }
    }
    
}

