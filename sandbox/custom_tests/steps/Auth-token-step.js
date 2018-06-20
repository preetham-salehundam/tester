var {Given, When, Then} = require('cucumber');
var expect = require('chai').expect
var fetch = require('node-fetch')
var {getUAAToken} = require('../../../helpers/Uaa-helper')
var credentials = new Buffer("login-client-id:D0ckerU$erL0gin").toString('base64')
let response,status;

Given('a valid token is generated from UAA', function(){
    
    this.uaa_response = getUAAToken("https://3dc4259c-1187-4620-ae13-47b34e129969.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token?grant_type=client_credentials",credentials)
})

When('a {string} request to  {string} contains auth headers with bearer token', function(method, api){
   
    this.uaa_response.then((response) => {
        this.token = response;
        console.log(this.token);
        return fetch(api,{method:method ,headers: {"authorization": "Bearer "+this.token}}).then(function(res){
        status = res.status
    })} )
    

})
Then("the API shouldn't return unauthorized status",function(){
    expect(status).to.not.be.greaterThan(399).and.lessThan(500)
})
