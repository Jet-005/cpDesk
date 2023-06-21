"use strict"
const dishedServices = require("../services").dished
const cateServices = require("../services").category
module.exports = {
  "post,dished/save": {
    name: "save dished by category",
    method: "post",
    fun: [
      async (ctx, next) => {
        try {
          const { user } = ctx.state
          if (!user) return next()
          const getBody = ctx.request.body
          getBody.createTime = new Date()
          getBody.isDelete = 0 // 创建默认为0，即未删除
          const res = await dishedServices.create(getBody)
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
  "post,dished/update": {
    name: "update dished",
    method: "post",
    fun: [
      // checkUser,
      async (ctx, next) => {
        try {
          const { user } = ctx.state
          if (!user) return next()
          const getBody = ctx.request.body
          getBody.updateTime = new Date()
          const res = await dishedServices.findOneAndUpdateById(getBody.id, getBody)
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
  "post,dished/list": {
    name: "dished list",
    method: "post",
    fun: [
      // checkUser,
      async (ctx, next) => {
        const { user } = ctx.state
        if (!user) return next()
        const { page, cateId } = ctx.request.body
        const res = await dishedServices.findDishedsByCategory(page, 5, cateId)
        console.log(res)
        ctx.result = {
          success: true,
          msg: "ok",
          code: 0,
          data: res || [],
        }
        return next()
      },
    ],
  },
  "get,dished/get/:id": {
    name: "get dished info",
    method: "get",
    fun: [
      async (ctx, next) => {
        try {
          const { user } = ctx.state
          if (!user) return next()
          const getParams = ctx.params.id
          const res = await dishedServices.findOneById(getParams)
          if (!res) {
            ctx.result = {
              success: false,
              msg: "未找到菜品信息",
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
  "get,dished/del/:id/:isDelete": {
    name: "delete dished info",
    method: "get",
    fun: [
      async (ctx, next) => {
        try {
          const { user } = ctx.state
          if (!user) return next()
          const { id, isDelete } = ctx.params
          const data = await dishedServices.findOneById(id)
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
          const res = await dishedServices.findOneAndUpdateById(id, updateData)
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
