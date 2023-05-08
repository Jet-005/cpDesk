"use strict"

const jwt = require("jsonwebtoken")
const config = require("../config")
const userServices = require("../services").user
const { InvalidQueryError } = require("../lib/error")
const request = require("../lib/request")

const login = {}
const APPID = "wx817f97989e7492b3"
const APPSECRET = "ad77b60082615f95bb869e05602162cb"
login.login = async (ctx, next) => {
  const { code } = ctx.request.body
  if (!code) {
    throw new InvalidQueryError()
  }
  // 向微信服务器发送HTTP请求，获取用户的openid
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APPSECRET}&js_code=${code}&grant_type=authorization_code`
  const response = await request(url, { method: "get" })
  const { session_key, openid } = response
  console.log(session_key, openid, "wx callback")
  const user = await userServices.findOne({
    openid: openid,
  })
  if (!user) {
    // 向微信服务器发送HTTP请求，获取用户的openid
    await  userServices.createUser()
  } else {
    ctx.result = jwt.sign(
      {
        data: user._id,
        // 设置 token 过期时间
        exp: Math.floor(Date.now() / 1000) + 60 * 60, // 60 seconds * 60 minutes = 1 hour
      },
      config.secret
    )
  }
  return next()
}

module.exports = login
