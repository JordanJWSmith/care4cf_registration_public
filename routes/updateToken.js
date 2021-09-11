var readData = require('./readData');
var crypto = require('crypto');

// Update the user's accessToken
module.exports = async function(cookieToken, email, userID) {

    if ((typeof cookieToken !== "string") || (typeof email !== "string")) {
        return false          
    } else {

        var hash = crypto.createHash('md5').update(cookieToken).digest("hex");

        var updateTokenTable = "INSERT IGNORE INTO accesstokens VALUES (?, ?, ?)";
        var updateTokenTableValues = [hash, userID, cookieToken];
        var updateResults = await readData(updateTokenTable, updateTokenTableValues)
        .then(function(res) {
            console.log(res)
        })
        

        return updateResults
    }
    
}