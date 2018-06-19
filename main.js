var path = require('path');
var fs = require('fs');

var content = fs.readFileSync(path.join(__dirname,'baseline',"feature_templates","Auth-token.feature.template"));
var csv_content = fs.readFileSync(path.join(__dirname,'baseline',"features","data.csv"))
content=content.toString().replace("{{examples}}",csv_content.toString())
var feature_writer = fs.createWriteStream(path.join(__dirname,'baseline',"features","Auth-token.feature"))
feature_writer.write(content);