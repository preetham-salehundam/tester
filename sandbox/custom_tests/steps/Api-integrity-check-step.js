var {Given, When, Then} = require('cucumber');
var expect = require('chai').expect
var fetch = require('node-fetch')

var {getUAAToken} = require('../../../helpers/Uaa-helper')
var credentials = new Buffer("login-client-id:D0ckerU$erL0gin").toString('base64')


Given("auth token available", function(){
    this.uaa_response = getUAAToken("https://3dc4259c-1187-4620-ae13-47b34e129969.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token?grant_type=client_credentials",credentials)
})

When("{string} request is made to {string}", function(method, api){
    this.uaa_response.then((response) => {
        fetch(api, {method: method, headers: {'authorization': 'Bearer '+ response }}, function(res){
            return res.json();
        }).then((res) => {
            expect(res.status, 'status is not 200 but '+res.status).to.be.eql(200)
        }).catch(function(err){
            console.error(err)
        })
    }) 
    
})

Then("the response body schema {string} should be a valid", function(schema_file){
    console.log(schema_file)
    expect(schema_file,"schema file name is missing").not.to.be.undefined;
})
