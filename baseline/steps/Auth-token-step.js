var {Given, When, Then} = require('cucumber');
var expect = require('chai').expect
var fetch = require('node-fetch')
var {getUAAToken} = require('../../helpers/Uaa-helper')
var credentials = new Buffer("machine_client:p@ssword").toString('base64')
console.log(credentials);
let response,status;

Given('a valid token is generated from UAA', function(){
    
    this.uaa_response = getUAAToken("https://eb0e9076-8232-4721-a919-315cbb73ba83.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token?grant_type=client_credentials",credentials)
})

When('the request to {string} contain auth headers with bearer token', function(api){
   
    this.uaa_response.then((response) => {
        return fetch(api,{headers: {"authorization": "Bearer "+this.token}}).then(function(res){
        status = res.status
    })} )
    

})
Then("the API shouldn't return unauthorized status",function(){
    expect(status).to.not.be.greaterThan(399).and.lessThan(500)
})
