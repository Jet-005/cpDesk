const Cate = require("../models/index").getModel("category")

const category = {
  /**
   * @Description:根据openid查找用户
   * @date 2023/5/09
   * @params: { String } openid
   * @return: { Object | null }
   */
  async findOneByOpenId(openid) {
    let result = await Cate.findOne({ openid: openid }, { __v: 0 })
    return result
  },
  /**
   * @Description:根据CateId查找用户
   * @date 2023/5/09
   * @params: { String } CateId
   * @return: { Object | null }
   */
  async findOneById(CateId) {
    let result = await Cate.findOne({ _id: CateId }, { __v: 0 })
    return result
  },
  /**
   * @Description: 插入新分类数据
   * @date 2023/5/09
   * @params: { Object } data
   * @return: { Object | null }
   */
  async createCate(data) {
    let result = await Cate.create(data)
    return result
  },
  /**
   * @Description: 根据Cateid更新数据
   * @date 2023/5/09
   * @params: { String } CateId
   * @return: { Object | null }
   */
  // async findOneAndUpdateById(CateId) {
  //   let result = await Cate.create(CateData)
  //   return result
  // },
}

module.exports = category
