
var stringSimilarity = require('string-similarity');
var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');
var sleep = require("sleep");

lines = require('fs').readFileSync('./listOfRestau.json').toString().split('\n');
console.log(lines.lenght());
for(var i = 0; i<lines.lenght;i++)
{ console.log(lines[i]);
  request({
    uri: "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin",
  }, function(error, response, body) {
    var $ = cheerio.load(body);

    $(".poi-card-link").each(function() {
      var link = $(this);
      var name =  $(this).find('.poi_card-display-title').text();
      var href = link.attr("href");

      console.log("https://restaurant.michelin.fr" +  href);
    });


  });

}
