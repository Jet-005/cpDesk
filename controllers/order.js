"use strict";
const orderServices = require("../services").order;
// const { checkUser } = require("../middlewares/middlewares")
module.exports = {
  "get,order/mana/list/:page": {
    name: "order list",
    method: "get",
    fun: [
      // checkUser,
      async (ctx, next) => {
        try {
          const { user } = ctx.state;
          if (!user) return next();
          const { page } = ctx.params;
          const res = await orderServices.findAll(page, 5, user._id);
          const total = await orderServices.count(user._id);
          ctx.result = {
            success: true,
            msg: "ok",
            code: 0,
            data: res,
            count: total,
          };
          return next();
        } catch (error) {
          console.error(error);
        }
      },
    ],
  },
  "get,order/user/list/:page": {
    name: "order list",
    method: "get",
    fun: [
      // checkUser,
      async (ctx, next) => {
        try {
          const { user } = ctx.state;
          if (!user) return next();
          const { page } = ctx.params;
          const res = await orderServices.findAll(page, 5, user._id);
          const total = await orderServices.count(user._id);
          ctx.result = {
            success: true,
            msg: "ok",
            code: 0,
            data: res,
            count: total,
          };
          return next();
        } catch (error) {
          console.error(error);
        }
      },
    ],
  },
};
