const userServices = require("../services").user
const jwt = require("jsonwebtoken")
const config = require("../config")

//判断是否有当前用户
const checkUser = async (ctx, next) => {
  if (!ctx.header.uid) return await next()
  const userInfo = await userServices.findOneById(ctx.header.uid)
  if (!userInfo) {
    ctx.result = {
      success: false,
      msg: "未找到该用户",
      code: 2002,
    }
    return await next()
  }
  ctx.state.user = userInfo
  await next()
}
//判断用户登录状态
const verifyToken = async (ctx, next) => {
  const getToken = ctx.header.authorization
  if (!getToken) return await next()
  const token = getToken.split(" ")
  jwt.verify(token[1], config.secret)
  // .then((res) => {})
  await next()
}
module.exports = {
  checkUser,
  verifyToken,
}
