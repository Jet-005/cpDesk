'use strict'

const Router = require('koa-router')
const controllers = require('../controllers')
// const jwtMiddleware = require('../middlewares/jwt')

const router = new Router()
router.prefix('/api')
// router.use(jwtMiddleware)
for (let route of controllers) {
  router[route.method](route.url, ...route.fun);
}
module.exports = router
