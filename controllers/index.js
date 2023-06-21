"use strict"

const fs = require("fs")
const { checkUser, verifyToken } = require("../middlewares/middlewares")
const jwtMiddleware = require('../middlewares/jwt')

const files = fs.readdirSync(__dirname).filter((file) => file !== "index.js")

const controllers = {}
for (const file of files) {
  if (file.toLowerCase().endsWith("js")) {
    const controller = require(`./${file}`)
    controllers[`${file.replace(/\.js/, "")}`] = controller
  }
}

const addRoute = (ctrls) => {
  // let routeObj = {
  //   publicRoutes: [],
  //   privateRoutes: [],
  // }
  let routes = []
  if (!Object.keys(ctrls).length) return routes
  for (let f in ctrls) {
    const ctrlsKeys = Object.keys(ctrls[f]).filter((keys) => keys !== "public")
    if (!ctrlsKeys.length) return routes
    // const routeKey = ctrls[f].public ? "publicRoutes" : "privateRoutes"

    // if (ctrls[f].public) {
    for (let i of ctrlsKeys) {
      const methodAndUrl = i.split(",")
      const funArr = ctrls[f][i].fun || []
      routes.push({
        method: methodAndUrl[0] || "get",
        url: `/${methodAndUrl[1]}` || "/",
        fun: ctrls[f].public ? funArr : [verifyToken, checkUser, ...funArr],
      })
    }
    // }
  }
  return routes
}
module.exports = addRoute(controllers)
