var request = require('sync-request');
var returnCode;
var getUrl = 'https://google.com/';

console.log("Start  Return Request Sync");
returnCode = httpGet(getUrl);
console.log("Status Code (main)     : "+returnCode);
console.log("End    Return Request Sync");

function httpGet(url){
  var response = request(
    'GET',
    url
    );
    console.log("Status Code (function) : "+response.statusCode);
    return response.statusCode;
}
