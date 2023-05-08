const User = require("../models/index").getModel("user")

const user = {
  /**
   * @Description: ��¼
   * @date 2019/5/30
   * @params: { Object } userData
   * @return: { Object | null }
   */
  async findOne(userData) {
    console.log(User, "user model")
    let result = await User.findOne(userData)
    console.log(result, "user login")
    return result
  },
  async createUser(userData) {
    console.log(User, "user model")
    let result = await User.create(userData)
    console.log(result, "user login")
    return result
  },
}

module.exports = user
