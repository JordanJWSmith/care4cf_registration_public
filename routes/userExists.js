var readData = require('./readData');

// Check to see if the user already exists in the database
module.exports = async function(email) {

    if ( (typeof email !== "string") ) {
        return {
            logIn: false  
        }         
    } else {

        var checkLogin =  "SELECT * FROM users WHERE email = ?";
        var data = [email];
        var results = await readData(checkLogin, data);

        if (results.length > 0) {
            return { 
                logIn: (results.length > 0),
                userID: (results[0].userID)
             }
        } else {
            return {
                logIn: (results.length > 0)
            }
        }

        
    }
    
}