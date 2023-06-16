"use strict"
const cateServices = require("../services").category
const { checkUser } = require("../middlewares/middlewares")
module.exports = {
  "post,category/save": {
    name: "save category",
    method: "post",
    fun: [
      // checkUser,
      async (ctx, next) => {
        try {
          const { user } = ctx.state
          console.log(user, "check user")
          if (!user) {
            ctx.result = {
              success: false,
              msg: "未找到该用户",
              code: 2002,
            }
            return next()
          }
          const requestBody = ctx.request.body
          requestBody.userId = user._id
          requestBody.createTime = new Date()
          const res = await cateServices.createCate(requestBody)
          let response = {
            success: true,
            msg: "ok",
            code: 1,
          }
          if (!res._id) {
            response = {
              success: false,
              msg: "数据添加失败,请重新添加",
              code: 0,
            }
          }
          ctx.result = response || {}
          return next()
        } catch (error) {
          console.error(error)
        }
      },
    ],
  },
  "post,category/list/:page": {
    name: "category list",
    method: "post",
    fun: [
      // checkUser,
      async (ctx, next) => {
        console.log(ctx)
      },
    ],
  },
}
