"use strict"
module.exports = {
  name: "dished",
  schema: {
    name: String, // 菜品名称
    price: Number, // 菜品价格
    desc: String, // 菜品介绍
    details: String, // 详情
    covers: Array, //封面图片路径
    recipe: String, // 关联菜谱
    createTime: Date, //创建时间
    updateTime: Date, //更新时间
    isDelete: Number, //是否删除 1-已删除 0-未删除
    isLike: Number, // 是否点赞了 1-已点 0 - 未点
    likeUser: String, // 点赞人
    cateId: String, // 所属分类
  },
}
