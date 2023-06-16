"use strict"
module.exports = {
  name: "user",
  schema: {
    openid: String, // 微信openid
    nickName: String, // 微信昵称
    country: String, // 国家
    province: String, //省份
    city: String, //城市
    gender: String, // 性别
    avatarUrl: String, //头像地址
    createTime: Date, //创建时间
    updateTime: Date, //更新时间
    sessionKey: String, // session_key,用来检查登录是否失效
    connectId: String, // 关联的用户id,初始为""
    role: String, // user - 用户 mana - 商家 空字符串时为未配对
  },
}
