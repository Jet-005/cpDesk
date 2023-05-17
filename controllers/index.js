"use strict"

const fs = require("fs")

const files = fs.readdirSync(__dirname).filter((file) => file !== "index.js")

const controllers = {}
for (const file of files) {
  if (file.toLowerCase().endsWith("js")) {
    const controller = require(`./${file}`)
    controllers[`${file.replace(/\.js/, "")}`] = controller
  }
}

const addRoute = (ctrls) => {
  let routeObj = {
    publicRoutes: [],
    privateRoutes: [],
  }
  if (!Object.keys(ctrls).length) return routeObj
  for (let f in ctrls) {
    const ctrlsKeys = Object.keys(ctrls[f]).filter((keys) => keys !== "public")
    if (!ctrlsKeys.length) return routeObj
    const routeKey = ctrls[f].public ? "publicRoutes" : "privateRoutes"

    // if (ctrls[f].public) {
    for (let i of ctrlsKeys) {
      const methodAndUrl = i.split(",")
      const funArr = ctrls[f][i].fun
      routeObj[routeKey].push({
        method: methodAndUrl[0] || "get",
        url: `/${methodAndUrl[1]}` || "/",
        fun: funArr || [],
      })
    }
    // }
  }
  return routeObj
}
console.log(addRoute(controllers), "router ctrls")
module.exports = addRoute(controllers)
