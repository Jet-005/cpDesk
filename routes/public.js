"use strict"

const Router = require("koa-router")
const controllers = require("../controllers")
const router = new Router()
router.prefix("/api")
for (let route of controllers.publicRoutes) {
  console.log(route)
  router[route.method](route.url, ...route.fun)
}
module.exports = router
