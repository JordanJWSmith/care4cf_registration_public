var readData = require('./readData');

module.exports = async function(nhsNum) {

    if ( (typeof nhsNum !== "string")) {
        // console.log('nhsNum type: ', typeof nhsNum)
        return false           
    } else {

        // var checkLogin = 'SELECT * FROM users WHERE email = "' + email + '"';
        var checkLogin =  "SELECT * FROM users WHERE nhsNumber = ?";
        var data = [nhsNum];
        var results = await readData(checkLogin, data)
        .then(function(nhsResults) {
            // console.log('nhs results: ', nhsResults)
            return nhsResults
        })

        // console.log('length: ', results.length);
        return (results.length == 0);
        // console.log('userExists results:', results);
        // console.log('userExists check: ', results.length > 0);

        // console.log('nhs results: ', results);

        // return { 
        //    nhsNum: (results.length == 0)
        // //    fName: results[0].fName 
        // }
    }
    
}