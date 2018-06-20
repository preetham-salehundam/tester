Feature: Api sanity test

   this test is to check the integrity of the API i/p o/p

Background: UAA token generated
Given auth token available

Scenario Outline: validate the schema of the response
When <method> request is made to <api>
Then the response body schema <schema> should be a valid

Examples:
|api|method|schema|
|"https://evn-catalog-service-dev.run.aws-usw02-pr.ice.predix.io/v1/evn/catalog/coverages"|"GET"|"full-coverage-schema.json"|
|"https://evn-catalog-service-dev.run.aws-usw02-pr.ice.predix.io/v1/evn/catalog/coverages/1"|"GET"|"fuel-coverage-schema.json"|
|"https://evn-catalog-service-dev.run.aws-usw02-pr.ice.predix.io/v1/evn/catalog/coverages/assets?fuelId=1"|"GET"|"asset-fuel-coverage-schema.json"|