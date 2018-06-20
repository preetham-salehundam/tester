const path = require('path');
const fs = require('fs');

// const fearure_stream = fs.createReadStream(path.join(__dirname,'baseline',"feature_templates","Auth-token.feature.template"));
// const csv_stream = fs.createReadStream(path.join(__dirname,'baseline',"features","data.csv"))
// const gulp = require('gulp')
// let write_stream="";
// let streams = [ fs.createWriteStream(path.join(__dirname,"baseline","features","Auth-check.txt")) , fs.createWriteStream(path.join(__dirname,"baseline","features","Auth-token.txt")) ]
// let stream = gulp.src(path.join(__dirname,"baseline","features","*.feature"))
// let count = 1
// stream.on('data', function(file){
//     console.log(file.relative)
//     file.pipe(envInjector).pipe(streams[count])
//     count = count+1;
// })

const {generate_feature} = require('./main')
generate_feature("Api-integrity-check.feature", "sandbox","custom_tests")

