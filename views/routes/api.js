var router = require('koa-router')();
var fs = require('fs')
var path = require('path')
var informs = '';

router.get('/getInform',async function (ctx, next) {
  ctx.state = {
    title: 'inform title'
  };

  fs.readFile('./spider/data/articleInfo.json','utf8',function (err, data) {

    if(err) { 
      console.error(err); 
      return; 
    } 

    informs = JSON.parse(data);
    // await ctx.render('getInform', {
    //   informs:informs
    // });
  });
  
  await ctx.render('getInform', {
      informs:informs
    });
   
})

router.get('/getEntry',async function (ctx, next) {
  var entrys = '';
  ctx.state = {
    title: 'entry title'
  };

  fs.readFile('./spider/data/dynamicEntry.json','utf8',function (err, data) {

    if(err) { 
      console.error(err); 
      return; 
    } 

    entrys = JSON.parse(data);
  });
  
  await ctx.render('getInform', {
      entrys:entrys
    });
   
})

module.exports = router;

