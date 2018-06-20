const gulp = require('gulp')
const shell = require('gulp-shell')
const path = require('path')
const fs = require('fs')
const copy = require('gulp-contrib-copy')
const run  = require('gulp-run-command').default

// var delDirectoryFiles = require('gulp-delete-directory-files');
// var del = require('del');
var gulpClean = require('gulp-clean')
var reporter = require('cucumber-html-reporter');
var reporterOptions = require('./report-config')
gulp.task('simple', shell.task([
  'cucumber-js simple/features -r simple/steps'
]));

gulp.task('background', shell.task([
  'cucumber-js background/features -r background/steps'
]));

gulp.task('outline', shell.task([
  'cucumber-js outline/features -r outline/steps'
]));

gulp.task('datatable', shell.task([
  'cucumber-js datatable/features -r datatable/steps'
]));

gulp.task('hooks', shell.task([
  'cucumber-js hooks/features -r hooks/steps'
]));

gulp.task('world', shell.task([
  'cucumber-js world/features -r world/steps'
]));

gulp.task('events', shell.task([
  'cucumber-js events/features -r events/steps'
]));

gulp.task('create-report-folder',['clean-reports'], function(){
  const dir = path.join(__dirname,path.dirname(reporterOptions.jsonFile))
  require('mkdirp')(dir , function(err){
    if(err) console.error(err)
    else console.log(`directory: ${dir} created!`)
  })
})
gulp.task('baseline',['create-report-folder'],shell.task([
  'cucumber-js baseline/features -r baseline/steps -f json:'+reporterOptions.jsonFile
]))

gulp.task('clean-reports', function(){
  console.log(path.join(__dirname,path.dirname(reporterOptions.jsonFile)))
  //gulp.src(path.join(__dirname,path.dirname(reporterOptions.jsonFile))).pipe(delDirectoryFiles())
  //del([path.join(__dirname,path.dirname(reporterOptions.jsonFile))]).then(paths => console.log('Deleted files and folders:\n', paths.join('\n')))
  return gulp.src(
    path.join(__dirname,path.dirname(reporterOptions.jsonFile),path.sep),{read: false})
    .pipe(gulpClean())
})

// generate html report from json
gulp.task('gen-reports-baseline',["baseline"],function(){
  reporter.generate(reporterOptions);
})

gulp.task('copy-baseline-features',function(){
  let sources = path.join('baseline','features','*.*'), dest = path.join('sandbox','custom_tests','features');
  return gulp.src(sources).pipe(copy()).pipe(gulp.dest(dest))
})

gulp.task('copy-baseline-steps',['copy-baseline-features'],function(){
  let sources = path.join('baseline','steps','*.*'), dest = path.join('sandbox','custom_tests','steps');
  return gulp.src(sources).pipe(copy()).pipe(gulp.dest(dest))
})

// gulp.task('sandbox-tests', ['create-report-folder'], 
//   run('cucumber-js sandbox/custom_tests/features -r sandbox/custom_tests/steps -f json:'+reporterOptions.jsonFile, {ignoreErrors: true})
// )

gulp.task('sandbox-tests', ['create-report-folder'],()=>{
  run('cucumber-js sandbox/custom_tests/features -r sandbox/custom_tests/steps -f json:'+reporterOptions.jsonFile, {
    ignoreErrors: true
  })
} )
  

// generate html report from json
gulp.task('gen-reports-sandbox',["sandbox-tests"],function(){
  reporter.generate(reporterOptions);
})

