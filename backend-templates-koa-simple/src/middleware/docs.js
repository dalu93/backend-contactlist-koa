import compose from 'koa-compose'
import koaStatic from 'koa-static2'
import Router from 'koa-router'
import path from 'path'

export default compose([

  // Redirect /docs --> /docs/index.html
  new Router().redirect('/docs', '/docs/index.html').routes(),

  // Serves all swagger-ui static files (CSS, fonts, etc.)
  koaStatic('docs', path.join(__dirname, '../../../node_modules/swagger-ui/dist')),

  // Overrides swagger index HTML with the customized one
  koaStatic('docs', path.join(__dirname, '../../../docs')),
])
