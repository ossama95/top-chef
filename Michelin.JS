

var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');
var nb_of_pages = 0;
var links = [];


function michelin()
{

request({
  uri: "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin",
}, function(error, response, body) {
  var $ = cheerio.load(body);

  $(".poi-card-link").each(function() {
    var link = $(this);
    var name =  $(this).find('.poi_card-display-title').text();
    var href = link.attr("href");
    link = "https://restaurant.michelin.fr" +  href;
    MichelinToJSON(link);
    console.log("https://restaurant.michelin.fr" +  href);
  });

  $(".mr-pager-link").each(function() {
    var link = $(this);

    if(nb_of_pages < parseInt(link.attr("attr-page-number")))
    {
      nb_of_pages = parseInt(link.attr("attr-page-number"));
    }

  });
  for(var i = 2; i  <= nb_of_pages; i++)
  {
    request({
      uri: "https://restaurant.michelin.fr/restaurants/france/restaurants-1-etoile-michelin/restaurants-2-etoiles-michelin/restaurants-3-etoiles-michelin/page-"+ i,
    }, function(error, response, body) {
      var $ = cheerio.load(body);
      $(".poi-card-link").each(function() {
        var link = $(this);
        var name =  $(this).find('.poi_card-display-title').text();
        var href = link.attr("href");
        link = "https://restaurant.michelin.fr" +  href;
        MichelinToJSON(link);

        console.log("https://restaurant.michelin.fr" +  href);
      });

    });
  }

});

}
michelin();

function MichelinToJSON(line)
{
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
  fs.appendFileSync("./errorlog.txt",line+"\r\n", null, 'utf8', (err) => {

});
}


});
}
