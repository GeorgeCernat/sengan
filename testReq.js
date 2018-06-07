var express = require("express");
var router = express.Router();


  
  router.post('/streamRequest', function (req, res) {

    console.log(req.body);


    res.send(JSON.stringify("success"));
  })



module.exports = router;