var readData = require('./readData');
var updateRecords = require('./updateRecords');
const fetch = require('node-fetch');
var updateToken = require('./updateToken');

// Insert new user into database
module.exports = async function(userDetails) {

    var newUser = 'INSERT INTO users SET ?; SELECT LAST_INSERT_ID();';
    
    var update = await updateRecords(newUser, userDetails)
        .then(async function(results) {
            console.log('new user results: ', results);
            console.log('new user ID:', results[1][0]['LAST_INSERT_ID()']);
            var userID = results[1][0]['LAST_INSERT_ID()'];
            var accessToken = userDetails.msalToken;
            var email = userDetails.email;

            return userID;
        })
        return update;
    
}