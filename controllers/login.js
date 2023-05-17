"use strict"

const jwt = require("jsonwebtoken")
const config = require("../config")
const userServices = require("../services").user
const { InvalidQueryError } = require("../lib/error")
const request = require("../lib/request")

const APPID = "wx817f97989e7492b3"
const APPSECRET = "ad77b60082615f95bb869e05602162cb"

module.exports = {
  public: true,
  "post,login": {
    name: "login",
    method: "post",
    fun: [
      async (ctx, next) => {
        const requestBody = ctx.request.body
        let { code } = requestBody
        if (!code) {
          throw new InvalidQueryError()
        }

        // 向微信服务器发送HTTP请求，获取用户的openid
        const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APPID}&secret=${APPSECRET}&js_code=${code}&grant_type=authorization_code`
        const response = await request(url, { method: "get" })
        const { session_key, openid } = response
        // 用openid作为用户唯一标识插入表中
        let user = await userServices.findOneByOpenId(openid)
        if (!user) {
          // 如果没有找到该openid的用户,则插入一条数据,包含省市区等信息,如果没有,信息将为空
          // 0-未知 1-男性 2-女性
          const genderEmnu = ["未知", "男性", "女性"]
          requestBody.gender = genderEmnu[requestBody.gender]
          delete requestBody.code
          requestBody.openid = openid
          requestBody.createTime = new Date()
          requestBody.sessionKey = session_key
          const res = await userServices.createUser(requestBody)
          user = res
        }
        const data = {
          token: jwt.sign(
            {
              data: user._id,
              // 设置 token 过期时间
              exp: Math.floor(Date.now() / 1000) + 60 * 1440, // 60 seconds * 60 minutes = 1 hour
            },
            config.secret
          ),
          userId: user._id,
        }
        ctx.result = data || {}
        return next()
      },
    ],
  },
}
