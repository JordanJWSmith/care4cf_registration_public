var readData = require('./readData');
var updateRecords = require('./updateRecords');
const fetch = require('node-fetch');
var updateToken = require('./updateToken');


module.exports = async function(userDetails) {
    console.log('new user Details: ', userDetails);


    var newUser = 'INSERT INTO users SET ?; SELECT LAST_INSERT_ID();';

    // var results = await updateRecords(newUser, userDetails);
    
        await updateRecords(newUser, userDetails)
        .then(async function(results) {
            // console.log('new user results:', results[1][0]['LAST_INSERT_ID()']);
            var userID = results[1][0]['LAST_INSERT_ID()'];
            var accessToken = userDetails.msalToken;
            var email = userDetails.email;
            // console.log('newUser access token: ', accessToken);
            await updateToken(accessToken, email, userID) 

            // var userID = userDetails.userID;
            return true;
        })
    

    return true;
    // .then(function(results) {
    //     return true
    // })
    // return true;
}