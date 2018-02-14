
var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');

var lines = require('fs').readFileSync('linkfourchette.txt', 'utf-8')
    .split('\n')
    .filter(Boolean);


lines.forEach(function(line)
{

});

function check(line)
{


    request({
      uri: line,
    },function(error, response, body) {
try{

    var $ = cheerio.load(body);
    var restaurant = new Object();
    restaurant.name = $(".restaurantSummary-name").text().trim();
    restaurant.adresse = $(".restaurantSummary-address").text().trim();
    restaurant.event =  $(".saleType--event").find(".saleType-title").text().trim();
    restaurant.promo =  $(".saleType--specialOffer").find(".saleType-title").text().trim();
    if(restaurant.promo != "" || restaurant.event != "")
    {
      fs.appendFileSync("./reduc.json", JSON.stringify(restaurant) +"\r\n", null, 'utf8', (err) => {

    });
    }

   }
     catch(e)
     {

     }

});

}
