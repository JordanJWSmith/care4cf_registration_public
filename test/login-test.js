var login = require('../routes/login.js');
// var requireLogin = login.requireLogin;
var expect = require('chai').expect;

describe('#login()', function() {
    var args = Array.prototype.slice.call(arguments);

    context('with non-string arguments', function() {
        it('should return false', async function() {
            expect(
                await login(1, 2).then(
                    function(results) {
                        return results.logIn
                    }
                )
            ).to.be.undefined;
        })
    })

    context('with non-existent email', function() {
        it('should return bool', async function() {
            expect(
                await login('testToken12345', 'fake@email.co.uk').then(
                    function(results) {
                        return results.logIn
                    }
                )
            ).to.be.undefined;
        })
    })
 

    context('with string arguments', function() {
        it('should return bool', async function() {
            expect(
                await login('testToken12345', 'ucabjjw@ucl.ac.uk').then(
                    function(results) {
                        return results.logIn
                    }
                )
            ).to.be.false;
        })
    })
})

