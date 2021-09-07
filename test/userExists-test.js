var userExists = require('../routes/userExists.js');
var expect = require('chai').expect;


describe('#userExists()', function() {
    var args = Array.prototype.slice.call(arguments);

    context('with no arguments', function() {
        it('should return false', async function() {
            expect(await userExists()
            .then(function(results) {
                return results.logIn
            })
            ).to.be.false;
        })
    })

    context('with a non-string string', function() {
        it('should return false', async function() {
            expect(await userExists(1)
            .then(function(results) {
                return results.logIn
            })
            ).to.be.false;
        })
    })

    context('with empty string', function() {
        it('should return false', async function() {
            expect(await userExists('')
            .then(function(results) {
                return results.logIn
            })
            ).to.be.false;
        })
    })
 

    context('with a non-email string', function() {
        it('should return false', async function() {
            expect(await userExists('test')
            .then(function(results) {
                return results.logIn
            })
            ).to.be.false;
        })
    })

    context('with a non-existant email', function() {
        it('should return false', async function() {
            expect(await userExists('unit.test@example.com')
            .then(function(results) {
                return results.logIn
            })
            ).to.be.false;
        })
    })

    context('with an email address in database', function() {
        it('should return false', async function() {
            expect(await userExists('ucabjjw@ucl.ac.uk')
            .then(function(results) {
                return results.logIn
            })
            ).to.be.true;
        })
    })

    
})

