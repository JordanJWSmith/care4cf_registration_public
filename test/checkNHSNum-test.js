var checkNHSNum = require('../routes/checkNHSNum.js');
var expect = require('chai').expect;


describe('#checkNSHNum()', function() {
    var args = Array.prototype.slice.call(arguments);

    context('with no arguments', function() {
        it('should return false', async function() {
            expect(await checkNHSNum()).to.be.false;
        })
    })

    context('with empty string', function() {
        it('should return false', async function() {
            expect(await checkNHSNum('')).to.be.false;
        })
    })
 

    context('with nine-digit string', function() {
        it('should return false', async function() {
            expect(await checkNHSNum('123456789')).to.be.false;
        })
    })

    context('with eleven-digit string', function() {
        it('should return false', async function() {
            expect(await checkNHSNum('12345678900')).to.be.false;
        })
    })

    context('with ten-digit string already in database', function() {
        it('should return false', async function() {
            expect(await checkNHSNum('1234567890')).to.be.false;
        })
    })

    context('with ten-digit string not in database', function() {
        it('should return true', async function() {
            expect(await checkNHSNum('1111111111')).to.be.true;
        })
    })
})

