const userServices = require("../services").user
const jwt = require("jsonwebtoken")
const config = require("../config")
const koaJwt = require("koa-jwt")

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
  // 将 token 中的数据解密后存到 ctx 中
  try {
    if (typeof ctx.request.headers.authorization === "string") {
      const token = ctx.request.headers.authorization.slice(7)
      ctx.jwtData = jwt.verify(token, config.secret)
    } else {
      throw { code: 401, message: "no authorization" }
    }
  } catch (err) {
    throw { code: 401, message: err.message }
  }
  await next()
}
module.exports = {
  checkUser,
  verifyToken,
}
