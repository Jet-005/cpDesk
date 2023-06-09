"use strict";
const dishedServices = require("../services").dished;
const { checkManager } = require("../middlewares/middlewares");

module.exports = {
  "post,dished/mana/save": {
    name: "save dished by category",
    method: "post",
    fun: [
      async (ctx, next) => {
        try {
          const { user } = ctx.state;
          if (!user) return next();
          const getBody = ctx.request.body;
          getBody.createTime = new Date();
          getBody.isOnline = 0; // 创建默认为0，即下线状态
          const res = await dishedServices.create(getBody);
          let response = {
            success: true,
            msg: "ok",
            code: 1,
          };
          if (!res._id) {
            response = {
              success: false,
              msg: "数据添加失败,请重新添加",
              code: 0,
            };
          }
          ctx.result = response || {};
          return next();
        } catch (error) {
          console.error(error);
        }
      },
    ],
  },
  "post,dished/mana/update": {
    name: "update dished",
    method: "post",
    fun: [
      // checkUser,
      async (ctx, next) => {
        try {
          const { user } = ctx.state;
          if (!user) return next();
          const getBody = ctx.request.body;
          getBody.updateTime = new Date();
          const res = await dishedServices.findOneAndUpdateById(
            getBody.id,
            getBody
          );
          if (!res) {
            ctx.result = {
              success: false,
              msg: "数据添加失败,请重新添加",
              code: 0,
            };
          } else {
            ctx.result = { success: true, msg: "ok", code: 1 };
          }
          return next();
        } catch (error) {
          console.error(error);
        }
      },
    ],
  },
  "post,dished/mana/list": {
    name: "dished list",
    method: "post",
    fun: [
      // checkUser,
      async (ctx, next) => {
        const { user } = ctx.state;
        if (!user) return next();
        const { page, cateId } = ctx.request.body;
        const res = await dishedServices.findDishedsByCategory(page, 5, cateId);
        const total = await dishedServices.count(cateId);
        ctx.result = {
          success: true,
          msg: "ok",
          code: 0,
          data: res || [],
          count: total,
        };
        return next();
      },
    ],
  },
  "get,dished/get/:id": {
    name: "get dished info",
    method: "get",
    fun: [
      async (ctx, next) => {
        try {
          const { user } = ctx.state;
          if (!user) return next();
          const getParams = ctx.params.id;
          const res = await dishedServices.findOneById(getParams);
          if (!res) {
            ctx.result = {
              success: false,
              msg: "未找到菜品信息",
              code: -1,
            };
          } else {
            ctx.result = {
              success: true,
              msg: "success",
              data: res,
              code: 1,
            };
          }
          return next();
        } catch (error) {
          console.error(error);
        }
      },
    ],
  },
  "get,dished/mana/change/:id/:isOnline": {
    name: "change dished status",
    method: "get",
    fun: [
      async (ctx, next) => {
        try {
          const { user } = ctx.state;
          if (!user) return next();
          const { id, isOnline } = ctx.params;
          const data = await dishedServices.findOneById(id);
          if (data.isOnline === Number(isOnline)) {
            const tips = isOnline === 1 ? "上架" : "下架";
            ctx.result = {
              success: false,
              msg: `${tips}失败！不可重复${tips}`,
              code: 0,
            };
            return next();
          }
          const updateData = {
            updateTime: new Date(),
            isOnline: isOnline,
          };
          const res = await dishedServices.findOneAndUpdateById(id, updateData);
          if (!res) {
            ctx.result = {
              success: false,
              msg: "删除失败！请重新操作",
              code: 0,
            };
          } else {
            ctx.result = { success: true, msg: "ok", code: 1 };
          }
          return next();
        } catch (error) {
          console.error(error);
        }
      },
    ],
  },
  "post,dished/user/list": {
    name: "user dished list",
    method: "post",
    fun: [
      // checkUser,
      checkManager,
      async (ctx, next) => {
        const { mana, user } = ctx.state;
        if (!mana || !user) return next();
        const { page, cateId } = ctx.request.body;
        const res = await dishedServices.findDishedsByCategory(
          page,
          5,
          cateId,
          { isOnline: 1 }
        );
        const total = await dishedServices.count(cateId, { isOnline: 1 });
        ctx.result = {
          success: true,
          msg: "ok",
          code: 0,
          data: res || [],
          count: total,
        };
        return next();
      },
    ],
  },
  "get,dished/user/like/:isLike/:id": {
    name: "like dished",
    method: "get",
    fun: [
      // checkUser,
      checkManager,
      async (ctx, next) => {
        const { mana, user } = ctx.state;
        if (!mana || !user) return next();
        const { id, isLike } = ctx.params;
        const data = await dishedServices.findOneById(id);
        if (!data) {
          ctx.result = {
            success: false,
            msg: "未找到菜品信息",
            code: -1,
          };
          return next();
        }
        const updateData = {
          updateTime: new Date(),
          isLike: isLike === '0' ? 1 : 0,
          likeUser: user._id,
        };
        const res = await dishedServices.findOneAndUpdateById(id, updateData);
        if (!res) {
          ctx.result = {
            success: false,
            msg: "点赞失败！请重新操作",
            code: 0,
          };
        } else {
          ctx.result = { success: true, msg: "ok", code: 1 };
        }
        return next();
      },
    ],
  },
};
