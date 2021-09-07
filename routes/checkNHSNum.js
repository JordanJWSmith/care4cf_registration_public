var readData = require('./readData');

module.exports = async function(nhsNum) {

    if ((typeof nhsNum !== "string") || (nhsNum.length !== 10)) {
        return false           
    } else {

        var checkLogin =  "SELECT * FROM users WHERE nhsNumber = ?";
        var data = [nhsNum];
        var results = await readData(checkLogin, data)
        .then(function(nhsResults) {
            return nhsResults
        })

        return (results.length == 0);

    }
    
}