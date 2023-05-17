module.exports = {
  "get,user": {
    name: "getUserInfo",
    method: "get",
    fun: [
      async (ctx, next) => {
        // const query = ctx.query
        console.log(ctx.query, ctx.querystring, ctx.params, "koa query")
        ctx.result = data || {}
        return next()
      },
    ],
  },
}
