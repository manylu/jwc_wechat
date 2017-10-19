const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

router.get('/getInform', function (ctx, next) {
  var informs = '';
  var file="../spider/data/articleInfo.json";
  var result=fs.readFileSync(file);
  informs = JSON.parse(result);
  // ctx.state = {
  //   title: 'inform title'
  // };

  // fs.readFile('../spider/data/articleInfo.json','utf8',function (err, data) {

  //   if(err) { 
  //     console.error(err); 
  //     return; 
  //   } 

  //   informs = JSON.parse(data);
  // });

  ctx.render('getInform', {
      informs:informs
    });
    
})

module.exports = router
