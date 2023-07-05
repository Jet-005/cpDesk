module.exports = {
  "get,user": {
    name: "getUserInfo",
    method: "get",
    fun: [
      async (ctx, next) => {
        // const query = ctx.query
        ctx.result = data || {}
        return next()
      },
    ],
  },
}
