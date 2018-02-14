

var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');

var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('linkMichelin.txt')
});

lineReader.on('line',function (line) {


  request({
    uri: line,
  },function(error, response, body) {
try {
  var $ = cheerio.load(body);
  var restaurant = new Object();
  restaurant.name =  $(".poi_intro-display-title").text();
  restaurant.rue =  $(".poi_intro-display-address").find(".thoroughfare").text();
  restaurant.postalcode = $(".poi_intro-display-address").find(".postal-code").text();
  restaurant.ville =  $(".poi_intro-display-address").find(".locality").text();
//  console.log(restaurant.name + " -> " + restaurant.rue + " -> " +restaurant.ville + " -> " + restaurant.postalcode);
  const content = JSON.stringify(restaurant);
  console.log(content);

  fs.appendFileSync("./listOfRestau.json", content+"\r\n", null, 'utf8', (err) => {

});
} catch (e) {
  fs.²appendFileSync("./errorlog.txt",line+"\r\n", null, 'utf8', (err) => {

});
}


});


});
