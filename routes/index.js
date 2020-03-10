var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let targetUrl = 'https://www.magazineluiza.com.br/selecao/ofertasdodia',
      jsonResponse = {},
      productsKey = 'produtos';

  request(targetUrl, function(error, response, body) {
    if(error){
      jsonResponse = {
        'error': error.message
      }
    }
    else {
      let $ = cheerio.load(body, {xmlMode: false});
      jsonResponse[productsKey] = [];

      $("ul[role='main']").find('a[name="linkToProduct"]').each(function() {
        //Getting product script
        let productData = $(this).find('script')[0].children[0].data;

        //Matching wrong inch-unit characters
        let doubleQuoteMatches = productData.match(/[ ][0-9]{2}["][ ]/gm);

        //Replacing wrong inch-unit characters with the correct ones
        if(doubleQuoteMatches !== null){
          doubleQuoteMatches.forEach(function(item, index){
            let original = item;
            let newText = original.replace('"', '”');
            productData = productData.replace(original, newText);
          });
        }

        //Parsing product JSON
        let productJson = JSON.parse(productData);

        //Pushing JSON into response
        jsonResponse[productsKey].push({
          'nome': productJson.name,
          'preco': productJson.offers.lowPrice,
          'imagem': productJson.image[0],
          'estoque': Math.floor(Math.random()*1001)
        });
      });
    }

    //Sending response
    res.send(jsonResponse);
  });
});

module.exports = router;
