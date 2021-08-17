var readData = require('./readData');
var crypto = require('crypto');

module.exports = async function(cookieToken, email, userID) {

    if ((typeof cookieToken !== "string") || (typeof email !== "string")) {
        return false          
    } else {

        // var updateToken = 'UPDATE users SET msalToken = "' + cookieToken + '" WHERE email = "' + email + '"';
        // var updateToken = "UPDATE users SET msalToken = ? WHERE email = ?";
        // var data = [cookieToken, email];
        // var results = await readData(updateToken, data);
        // console.log('update results:', results);

        var hash = crypto.createHash('md5').update(cookieToken).digest("hex");
        // console.log('hash: ', hash);

        var updateTokenTable = "INSERT IGNORE INTO accesstokens VALUES (?, ?, ?)";
        var updateTokenTableValues = [hash, userID, cookieToken];
        var updateResults = await readData(updateTokenTable, updateTokenTableValues);
        // console.log(updateResults);

        return true
        // {
        //    logIn: (results.length > 0),
        //    fName: results[0].fName 
        // }
        
    }
    
}