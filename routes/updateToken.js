var readData = require('./readData');

module.exports = async function(cookieToken, email) {

    if ((typeof cookieToken !== "string") || (typeof email !== "string")) {
        return false          
    } else {

        // var updateToken = 'UPDATE users SET msalToken = "' + cookieToken + '" WHERE email = "' + email + '"';
        var updateToken = "UPDATE users SET msalToken = ? WHERE email = ?";
        var data = [cookieToken, email];
        var results = await readData(updateToken, data);
        // console.log('update results:', results);

        return true
        // {
        //    logIn: (results.length > 0),
        //    fName: results[0].fName 
        // }
        
    }
    
}