"use strict"
module.exports = {
  "post,test": {
    name: "test",
    method: "post",
    fun: [
      async (ctx, next) => {
        ctx.result = ctx.jwtData
        return next()
      },
    ],
  },
}
