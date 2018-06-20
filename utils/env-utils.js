const { Transform } = require('stream')
const regex = /{{[\w]*}}/mg
const env = require('../sandbox/env')
const utils = require('./environment-utils' )
const envInjector = new Transform({
    readableObjectMode: true,
    writableObjectMode: true,
    transform(chunk, encoding, callback){
        let transformed_chunk = chunk;
        while ((m = regex.exec(chunk.toString())) !== null) {
            // This is necessary to avoid infinite loops with zero-width matches
            if (m.index === regex.lastIndex) {
                regex.lastIndex++;
            }
            
            // The result can be accessed through the `m`-variable.
            new Set(m).forEach((match, groupIndex) => {
                console.log(`Found match, group ${groupIndex}: ${match}`);
                transformed_chunk=transformed_chunk.toString().replace(new RegExp(match,'g'),utils.getEnvProperty(match, "dev"))
                console.log("========");
                console.log(utils.getEnvProperty(match, "dev"))
            });
        }
    this.push(transformed_chunk.toString())
    callback();
    }
})
module.exports = envInjector