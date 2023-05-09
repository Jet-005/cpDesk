"use strict";

const fs = require("fs");

const files = fs.readdirSync(__dirname).filter((file) => file !== "index.js");

const controllers = {};
for (const file of files) {
  if (file.toLowerCase().endsWith("js")) {
    const controller = require(`./${file}`);
    controllers[`${file.replace(/\.js/, "")}`] = controller;
  }
}
const addRoute = (ctrls, isPublic) => {
  const routeList = [];
  if (!Object.keys(ctrls).length) return routeList;
  for (let f in ctrls) {
    const ctrlsKeys = Object.keys(ctrls[f]).filter((keys) => keys !== "public");
    if (!ctrlsKeys.length) return routeList;
    if (ctrls[f].public === isPublic) {
      for (let i of ctrlsKeys) {
        const methodAndUrl = i.split(",");
        const funArr = ctrls[f].fun;
        routeList.push({
          method: methodAndUrl[0] || "get",
          url: `/${methodAndUrl[1]}` || "/",
          fun: funArr || [],
        });
      }
    }
  }
  return routeList;
};
const publicRoutes = addRoute(controllers, true);
const privateRoutes = addRoute(controllers, false);
module.exports = {
  publicRoutes,
  privateRoutes,
};
