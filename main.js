var path = require('path');
var fs = require('fs');
const envInjector = require('./utils/env-utils')
module.exports = {
    "generate_feature": function(filename, source_dir, tests_dir){
        var content = fs.readFileSync(path.join(__dirname, source_dir,tests_dir,"feature_templates",filename+".template"));
        var csv_content = fs.readFileSync(path.join(__dirname, source_dir ,"data.csv"))
        content=content.toString().replace("{{examples}}",csv_content.toString())
        var feature_writer = fs.createWriteStream(path.join(__dirname,source_dir,tests_dir,"features",filename))
        feature_writer.write(content);
        let feature_read_stream = fs.createReadStream(path.join(__dirname,source_dir,tests_dir,"features",filename))
        let feature_write_stream = fs.createWriteStream(path.join(__dirname,source_dir,tests_dir,"features",filename))
        // pipe feature with env placeholder to env injector which will replace env placeholders with env props
        feature_read_stream.pipe(envInjector).pipe(feature_write_stream)
    }
}
