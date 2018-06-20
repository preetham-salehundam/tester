const path = require('path');
const fs = require('fs');
const envInjector = require('./utils/env-utils')

fs.readdir(path.join(__dirname,"baseline","features"), (err,files) => {
    let csv_content = fs.readFileSync(path.join(__dirname,"data.csv"))
    files.forEach((file) => {
        let template = file + ".template"
        let content = fs.readFileSync(path.join(__dirname,'baseline',"feature_templates",template));
        // replace place holder with csv data
        content=content.toString().replace("{{examples}}",csv_content.toString())
        console.log("done inserting csv content");
        let feature_writer = fs.createWriteStream(path.join(__dirname,'baseline',"features",file))
        feature_writer.write(content);
        feature_writer.close();
        console.log("done writing csv content to feature");
        let feature_read_stream = fs.createReadStream(path.join(__dirname,'baseline',"features",file))
        let feature_write_stream = fs.createWriteStream(path.join(__dirname,'baseline',"features",file))
        // pipe feature with env placeholder to env injector which will replace env placeholders with env props
        feature_read_stream.pipe(envInjector).pipe(feature_write_stream)
        feature_write_stream.on('finish',function(){
            feature_write_stream.close()
        })
        console.log("done updating env value in feature file!")
    })
})



// pythonShell.run("./test.py", function(err,results){ 
//     if(err) throw err; 
//     console.log("finished!" + results)
// })