var readData = require('./readData');
var updateRecords = require('./updateRecords');
const fetch = require('node-fetch');
var updateToken = require('./updateToken');


module.exports = async function(userDetails) {
   

    // var dateString = userDetails.doB;
    // var dateArr = dateString.split("/");
    // var year = dateArr[2];
    // var month = dateArr[1];
    // var day = dateArr[0];
    // var date = year + '-' + month + '-' + day;
    // userDetails.doB = date;

    console.log('new user Details: ', userDetails);


    var newUser = 'INSERT INTO users SET ?; SELECT LAST_INSERT_ID();';

    // var results = await updateRecords(newUser, userDetails);
    
    update = await updateRecords(newUser, userDetails)
        .then(async function(results) {
            console.log('new user results: ', results);
            console.log('new user ID:', results[1][0]['LAST_INSERT_ID()']);
            var userID = results[1][0]['LAST_INSERT_ID()'];
            var accessToken = userDetails.msalToken;
            var email = userDetails.email;
            // console.log('updateToken detials: ', userID, accessToken, email);
            // console.log('newUser access token: ', accessToken);
            // await updateToken(accessToken, email, userID)
            // .then(function(tokenResults) {
            //     console.log('updateToken results: ', tokenResults)
            // })

            // var userID = userDetails.userID;
            return userID;
        })
        return update;
    

    
    // .then(function(results) {
    //     return true
    // })
    // return true;
}