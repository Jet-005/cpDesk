const User = require("../models/index").getModel("user")

const user = {
  /**
   * @Description:根据openid查找用户
   * @date 2023/5/09
   * @params: { String } openid
   * @return: { Object | null }
   */
  async findOneByOpenId(openid) {
    let result = await User.findOne({ openid: openid }, { __v: 0 })
    return result
  },
  /**
   * @Description:根据userId查找用户
   * @date 2023/5/09
   * @params: { String } userId
   * @return: { Object | null }
   */
  async findOneById(userId) {
    let result = await User.findOne({ _id: userId }, { __v: 0 })
    return result
  },
  /**
   * @Description: 插入新用户数据
   * @date 2023/5/09
   * @params: { Object } userData
   * @return: { Object | null }
   */
  async createUser(userData) {
    let result = await User.create(userData)
    return result
  },
  /**
   * @Description: 根据userid更新数据
   * @date 2023/5/09
   * @params: { String } userId
   * @return: { Object | null }
   */
  // async findOneAndUpdateById(userId) {
  //   let result = await User.create(userData)
  //   return result
  // },
}

module.exports = user
