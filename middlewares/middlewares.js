const userServices = require("../services").user

//判断用户登录状态
const checkUser = async (ctx, next) => {
  if (!ctx.header.uid) return await next()
  const userInfo = await userServices.findOneById(ctx.header.uid)
  if (!userInfo) await next()
  // if(userInfo && !userInfo.isActive) return ctx.body = await ctx.code('1088');
  ctx.state.user = userInfo
  await next()
}
module.exports = {
  checkUser,
}
