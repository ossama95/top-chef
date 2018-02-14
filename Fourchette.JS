
var stringSimilarity = require('string-similarity');
var request = require("request");
var cheerio = require("cheerio");
var fs = require('fs');
var sleep = require("sleep");


var lineReader = require('readline').createInterface({
  input: fs.createReadStream('listOfRestau.json')
});

lineReader.on('line',async function (line) {

var a = await getlink(line);

});

 function getlink(line)
{
  var restaurant = JSON.parse(line);

    request({
      uri: "https://www.lafourchette.com/search-refine/" + restaurant.name.trim(),
    },function(error, response, body) {
  try {
    var $ = cheerio.load(body);
    $(".resultItem").each(function() {
      var res = $(this).find(".resultItem-name").text();
      //console.log(stringSimilarity.compareTwoStrings(restaurant.name,res));
      if(res.includes(restaurant.name) || restaurant.name.includes(res) || stringSimilarity.compareTwoStrings(restaurant.name,res) > 0.40)
      {
        var adress =  $(this).find(".resultItem-address").text()
        if(adress.includes(restaurant.postalcode))
        {
          var link =  $(this).find(".resultItem-name > a").attr("href");
          console.log(link);
          fs.appendFileSync("./linkfourchette.txt","https://www.lafourchette.com"+link+"\r\n", null, 'utf8', (err) => {

        });
        }
      }
    });
  } catch (e) {
   console.log(e);
    fs.appendFileSync("./errorlog.txt",line+"\r\n", null, 'utf8', (err) => {

  });
  }

  });
  return 1;
}
