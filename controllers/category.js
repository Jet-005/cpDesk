"use strict"
const cateServices = require("../services").category
// const { checkUser } = require("../middlewares/middlewares")
module.exports = {
  "post,category/save": {
    name: "save category",
    method: "post",
    fun: [
      // checkUser,
      async (ctx, next) => {
        try {
          const { user } = ctx.state
          if (!user) return next()
          const getBody = ctx.request.body
          getBody.userId = user._id
          getBody.createTime = new Date()
          getBody.isDelete = 0 // 创建默认为0，即未删除
          const res = await cateServices.createCate(getBody)
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
  "post,category/update": {
    name: "update category",
    method: "post",
    fun: [
      // checkUser,
      async (ctx, next) => {
        try {
          const { user } = ctx.state
          if (!user) return next()
          const getBody = ctx.request.body
          // const updateData = Object.assign({}, getBody)
          // updateData.updateTime = new Date()
          const res = await cateServices.findOneAndUpdateById(getBody.id, user._id, {
            updateTime: new Date(),
            name: getBody.name,
          })
          if (!res) {
            ctx.result = {
              success: false,
              msg: "数据添加失败,请重新添加",
              code: 0,
            }
          } else {
            ctx.result = { success: true, msg: "ok", code: 1 }
          }
          return next()
        } catch (error) {
          console.error(error)
        }
      },
    ],
  },
  "get,category/list/:page": {
    name: "category list",
    method: "get",
    fun: [
      // checkUser,
      async (ctx, next) => {
        const { user } = ctx.state
        if (!user) return next()
        const { page } = ctx.params
        const res = await cateServices.findAll(page, 5)
        ctx.result = {
          success: true,
          msg: "ok",
          code: 0,
          data: res,
        }
        return next()
      },
    ],
  },
  "get,category/get/:id": {
    name: "get category info",
    method: "get",
    fun: [
      async (ctx, next) => {
        try {
          const { user } = ctx.state
          if (!user) return next()
          const getParams = ctx.params.id
          const res = await cateServices.findOneById(getParams, user._id)
          if (!res) {
            ctx.result = {
              success: false,
              msg: "未找到分类信息",
              code: -1,
            }
          } else {
            ctx.result = {
              success: true,
              msg: "success",
              data: res,
              code: 1,
            }
          }
          return next()
        } catch (error) {
          console.error(error)
        }
      },
    ],
  },
  "get,category/del/:id/:isDelete": {
    name: "delete category info",
    method: "get",
    fun: [
      async (ctx, next) => {
        try {
          const { user } = ctx.state
          if (!user) return next()
          const userId = user._id
          const { id, isDelete } = ctx.params
          const data = await cateServices.findOneById(id, userId)
          if (data.isDelete === Number(isDelete)) {
            ctx.result = {
              success: false,
              msg: "删除失败！不可重复删除",
              code: 0,
            }
            return next()
          }
          const updateData = {
            updateTime: new Date(),
            isDelete: isDelete,
          }
          const res = await cateServices.findOneAndUpdateById(id, userId, updateData)
          if (!res) {
            ctx.result = {
              success: false,
              msg: "删除失败！请重新操作",
              code: 0,
            }
          } else {
            ctx.result = { success: true, msg: "ok", code: 1 }
          }
          return next()
        } catch (error) {
          console.error(error)
        }
      },
    ],
  },
}
