var readData = require('./readData');

module.exports = async function(cookieToken) {

    if (!cookieToken) {
        return false;

    } else if (typeof cookieToken !== "string")  {
        // console.log('cookieToken: ', cookieToken);
        // throw new TypeError('Cookie should be string.');
        return false;

    } else {
        // var checkLogin = 'SELECT * FROM users WHERE msalToken = "' + cookieToken + '"';
        // var checkLogin = "SELECT * FROM users WHERE msalToken = ?";
        var checkLogin = "SELECT * FROM accesstokens WHERE accessToken = ?";
        var data = [cookieToken];
        var results = await readData(checkLogin, data);

        console.log('login results: ', results);
        // console.log('query length: ', results.length);
        // console.log(results.length == 1);

        if (results.length == 1) {
            var userID = results[0].userID;
            var findName = "SELECT fName FROM users WHERE userID = ?";
            var findNameValue = [userID];
            var nameResult = await readData(findName, findNameValue)
            console.log('name: ', nameResult[0].fName);
            return {
                logIn: true,
                fName: nameResult[0].fName
            }
        } else {
            return false;
        }

        // if (results.length == 0) {
        //     return false
        // } else {
        //     return {
        //         logIn: true,
        //         fName: results[0].fName
        //     }
            
        // }
    }

    // if ((typeof cookieToken !== "string") || (typeof email !== "string")) {
    //     return false           
    // } else {

    //     var checkLogin = 'SELECT * FROM users WHERE email = "' + email + '"';
    //     var results = await readData(checkLogin);
    //     // console.log('results: ', results);

    //     if (results.length == 0) {
    //         return false
    //     }

    //     return { 
    //        logIn: (results[0].msalToken == cookieToken),
    //        fName: results[0].fName 
    //     }
    // }
    
}

