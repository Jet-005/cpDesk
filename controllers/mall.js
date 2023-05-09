'use strict'
const mall = {}

mall.test = async (ctx, next) => {
  ctx.result = ctx.jwtData
  return next()
}

module.exports = mall
