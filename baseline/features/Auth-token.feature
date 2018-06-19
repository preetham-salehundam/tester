Feature: UAA authorization bearer token check

   check the UAA auth token

   Background: token generated by UAA
   Given a valid token is generated from UAA

   Scenario Outline: check for a appropriate authorization header in the request
   When the request to <api> contain auth headers with bearer token
   Then the API shouldn't return unauthorized status

   Examples:
   |api|
|"https://evn-catalog-service.run.aws-usw02-pr.ice.predix.io/v1/evn/catalog/coverages/subsystems/90?fuelId=1&assetId=15&systemId=59"|
|"https://evn-catalog-service.run.aws-usw02-pr.ice.predix.io/v1/evn/catalog/coverages/subsystems/90?fuelId=1&assetId=15&systemId=59"|
|"https://evn-catalog-service.run.aws-usw02-pr.ice.predix.io/v1/evn/catalog/coverages/subsystems/90?fuelId=1&assetId=15&systemId=59"|

   