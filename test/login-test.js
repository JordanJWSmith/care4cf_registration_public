var login = require('../routes/login.js');
// var requireLogin = login.requireLogin;
var expect = require('chai').expect;

var loginToken = "eyJ0eXAiOiJKV1QiLCJub25jZSI6IjF5dTN1WENYdFdhd2xtYUNwM094SmIzQ3ppdmRGZXQwbDU2ejRsUE5kYkEiLCJhbGciOiJSUzI1NiIsIng1dCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyIsImtpZCI6Im5PbzNaRHJPRFhFSzFqS1doWHNsSFJfS1hFZyJ9.eyJhdWQiOiIwMDAwMDAwMy0wMDAwLTAwMDAtYzAwMC0wMDAwMDAwMDAwMDAiLCJpc3MiOiJodHRwczovL3N0cy53aW5kb3dzLm5ldC8xZmFmODhmZS1hOTk4LTRjNWItOTNjOS0yMTBhMTFkOWE1YzIvIiwiaWF0IjoxNjI5NjUxODQzLCJuYmYiOjE2Mjk2NTE4NDMsImV4cCI6MTYyOTY1NTc0MywiYWNjdCI6MCwiYWNyIjoiMSIsImFjcnMiOlsidXJuOnVzZXI6cmVnaXN0ZXJzZWN1cml0eWluZm8iXSwiYWlvIjoiRTJaZ1lNaWQrdkRqcXdtU216dy85WEJYcUhITjZjdm84dUk3MVNadk1hMHJZOU85aWlVQSIsImFtciI6WyJwd2QiXSwiYXBwX2Rpc3BsYXluYW1lIjoiQ0FSRTRDRiBSZWdpc3RyYXRpb24iLCJhcHBpZCI6IjliMTJhN2YzLTJmOTEtNGUwNS04YmMyLTJhMWJjM2M1YTcxMCIsImFwcGlkYWNyIjoiMCIsImZhbWlseV9uYW1lIjoiU21pdGgiLCJnaXZlbl9uYW1lIjoiSm9yZGFuIiwiaWR0eXAiOiJ1c2VyIiwiaXBhZGRyIjoiOTAuMjIwLjIwNi45MCIsIm5hbWUiOiJTbWl0aCwgSm9yZGFuIiwib2lkIjoiYjcwNDNkY2YtMjI2Mi00Mzc3LWI3ZGUtZGQ2N2FkZWI5MzZhIiwib25wcmVtX3NpZCI6IlMtMS01LTIxLTI5MDIyNjU2MjEtMTA2MzAyODYyMS0yMzgxNTYxNDgwLTgwMDM0NCIsInBsYXRmIjoiMiIsInB1aWQiOiIxMDAzMjAwMERDRjkwRTZCIiwicmgiOiIwLkFRVUFfb2l2SDVpcFcweVR5U0VLRWRtbHd2T25FcHVSTHdWT2k4SXFHOFBGcHhBRkFHUS4iLCJzY3AiOiJvcGVuaWQgcHJvZmlsZSBVc2VyLlJlYWQgZW1haWwiLCJzaWduaW5fc3RhdGUiOlsia21zaSJdLCJzdWIiOiJxalpEamc4Q25IQlZIV0poWWpaeHo4RHZoS1NCSVU2bF9xVDZUMmJUbmpBIiwidGVuYW50X3JlZ2lvbl9zY29wZSI6IkVVIiwidGlkIjoiMWZhZjg4ZmUtYTk5OC00YzViLTkzYzktMjEwYTExZDlhNWMyIiwidW5pcXVlX25hbWUiOiJ1Y2Fiamp3QHVjbC5hYy51ayIsInVwbiI6InVjYWJqandAdWNsLmFjLnVrIiwidXRpIjoibjN6X1ktQXNYa1NYUzRqcVFQVW5BQSIsInZlciI6IjEuMCIsInhtc19zdCI6eyJzdWIiOiJRekZmc0hES3llbXhnZndQYi1TUDYzWVZWeWh4Wk12LXRXb1l0QjIyOFZvIn0sInhtc190Y2R0IjoxMzYwODcxMzQ1fQ.GPRt-dM0Gnoffb3vgJzc5mZnV7CjPnEtnl5TBow-87p_N7pT07PaXJrwnhdqr80wARSO695oD0cdYANgynaja8hEvF_ObwafMpQgEAPKhZ_n-c2tnnIRm0oPgJZ_vvrBlKSWEShgF8C-vhQosq14Uw7MmB6oEfreLf6FBjk4cxGyP3Q2EKujdR9dQ9Xj3EeZn9ZXDm8xC1WNxQv6yML_86B3MB7kQUXKF1DXI5W128jXV3Cq_2QYXJB-R5W7s_CXWpdpLYZ339uGfosL9jQU-8WnF4f5P8dK5XQrjp6HaTllDwnEC4kTWHK9xK8mGAruQJ-SeHIiJvB9v0hNmTRY_Q";

describe('#login()', function() {
    var args = Array.prototype.slice.call(arguments);

    context('with non-string arguments', function() {
        it('should return error', async function() {
            expect(
                await login(1)
                .then(
                    function(results) {
                        return results
                    }
                )
            ).to.be.false;
        })
    })

    context('with non-existent token', function() {
        it('should return false', async function() {
            expect(
                await login('testToken12345').then(
                    function(results) {
                        return results
                    }
                )
            ).to.be.false;
        })
    })
 

    context('with no arguments', function() {
        it('should return false', async function() {
            expect(
                await login().then(
                    function(results) {
                        return results
                    }
                )
            ).to.be.false;
        })
    })

    context('with correct token', function() {
        it('should return object', async function() {
            expect(
                await login(loginToken).then(
                    function(results) {
                        return results
                    }
                )
            ).to.be.an('object');
        })
    })
})

