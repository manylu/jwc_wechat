const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!'
  })
})

router.get('/string', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello string!'
  })
})

router.get('/getInform_10', async (ctx, next) => {
  var informs = '';
  var file="./spider/data/articleInfo.json";
  var result=fs.readFileSync(file);
  informs = JSON.parse(result);
  ctx.state = {
    title: '重要通知'
  };

  await ctx.render('getInform_10', {
      informs:informs
    });
})

router.get('/getInform', async (ctx, next) => {
  var informs = '';
  var file="./spider/data/articleInfo.json";
  var result=fs.readFileSync(file);
  informs = JSON.parse(result);
  ctx.state = {
    title: '重要通知'
  };

  await ctx.render('getInform', {
      informs:informs
    });
})

router.get('/getEntry',async function (ctx, next) {
  var entrys = '';
  var file="./spider/data/dynamicEntry.json";
  var result=fs.readFileSync(file);
  entrys = JSON.parse(result);

  ctx.state = {
    title: '教务动态'
  };

  await ctx.render('getEntry', {
      entrys:entrys
    });
   
})

router.get('/getInform/:id', async (ctx, next) => {
  var informs = ''
  var inform = ''
  var id = ''
  var file="./spider/data/articleInfo.json";
  var result=fs.readFileSync(file);
  informs = JSON.parse(result);
  id = ctx.params.id
  inform = informs[id]
  ctx.state = {
    title: 'inform title'
  };

  await ctx.render('inform', {
      inform:inform
    });
})

router.get('/getEntry/:id', async (ctx, next) => {
  var entrys = ''
  var entry = ''
  var id = ''
  var file="./spider/data/dynamicEntry.json";
  var result=fs.readFileSync(file);
  entrys = JSON.parse(result);
  id = ctx.params.id
  entry = entrys[id]
  ctx.state = {
    title: 'entry title'
  };

  await ctx.render('entry', {
      entry:entry
    });
})

module.exports = router
