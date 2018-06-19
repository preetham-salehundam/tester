// var reporter = require('cucumber-html-reporter');
var options = {
        theme: 'bootstrap',
        jsonFile: 'test/report/cucumber_report.json',
        output: 'test/report/cucumber_report.html',
        reportSuiteAsScenarios: true,
        launchReport: false,
        // metadata: {
        //     "App Version":"1.0.0",
        //     "Test Environment": "STAGING",
        //     "Parallel": "Scenarios",
        //     "Executed": "Remote"
        // }
    };
 module.exports = options;
    // module.exports = reporter.generate(options);