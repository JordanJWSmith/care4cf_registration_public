var readData = require('./readData');

// Log the user in
module.exports = async function(cookieToken) {

    if (!cookieToken) {
        return false;

    } else if (typeof cookieToken !== "string")  {
        return false;

    // See if there are any matching accessTokens
    } else {
        var checkLogin = "SELECT * FROM accesstokens WHERE accessToken = ?";
        var data = [cookieToken];
        var results = await readData(checkLogin, data);

        // Get the corresponding userID
        if (results.length == 1) {
            var userID = results[0].userID;
            var findName = "SELECT fName FROM users WHERE userID = ?";
            var findNameValue = [userID];
            var nameResult = await readData(findName, findNameValue)
            if (nameResult.length > 0) {

                // Return login status and name
                return {
                    logIn: true,
                    fName: nameResult[0].fName
                }
            } else {
                return false;
            }

            
        } else {
            return false;
        }
    }

}

