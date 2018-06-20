var environment = require("../sandbox/env")
module.exports = {
    "getEnvProperty": function(env_key, env_name){
        let _env= environment.filter((env) => env.name == env_name )
        console.log(_env);
        if(_env){
        let prop = _env[0].values.filter((prop) => prop.key == env_key)
           return prop.length > 0 ? prop[0].value : [] 
        }

    }
}