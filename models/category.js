"use strict"
module.exports = {
  name: "category",
  schema: {
    name: String, // 分类名称
    userId: String, // 用户id
    dishedIds: Array, //关联的菜品id
    createTime: Date, //创建时间
    updateTime: Date, //更新时间
    isDelete: Number, //是否删除 1-已删除 0-未删除
  },
}
