var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send("Aqui será carregado o JSON do catálogo");
});

module.exports = router;
