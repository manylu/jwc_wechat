var router = require('koa-router')();

router.get('/', async function (ctx, next) {
  ctx.state = {
    title: 'koa title'
  };

  await ctx.render('index', {
  });
})

module.exports = router;
