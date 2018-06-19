var fetch = require('node-fetch');
let token =
module.exports={
    "getUAAToken": async function(url, credentials){
        try{
            const res = await fetch(url,{
                method: 'POST',
                headers: {
                    'authorization': "Basic "+credentials
                }
            })
            const json = await res.json();
            return json["access_token"];
        }catch(e){
            throw "Error generating token "+ e;
        }
    }
}