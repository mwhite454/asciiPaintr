var express = require('express');
var router = express.Router();
var fs = require('fs');

function makeArt(fileName, letterArt){
  fs.appendFile(fileName, letterArt, function (err) {});

}



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ascii | Paintr' });
});

router.post('/save', function(req, res, next){
  var fileName = './public/tmp/' + req.body.fileName;
  var letterArt =  req.body.bodyText;
  makeArt(fileName, letterArt);
});

router.get('/download', function(req, res){
  var file = req.query.fileName;
  var filepath = './public/tmp/' + file;
  res.download(filepath, function(err){
      if(err){
        console.log(err);
      }else{
        console.log('file downloaded: ' + filepath);
        console.log("Going to delete retrieved file");
        fs.unlink(filepath);
      }
  });
 });



module.exports = router;
