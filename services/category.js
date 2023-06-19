const Cate = require("../models/index").getModel("category")

const category = {
  /**
   * @Description:根据cateId跟userid查找分类
   * @date 2023/5/09
   * @params: { String } cateId
   * @params: { String } userId
   * @return: { Object | null }
   */
  async findOneById(cateId, userId) {
    let result = await Cate.findOne({ _id: cateId, userId: userId }, { __v: 0 })
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
   * @Description: 根据Cateid跟userid更新数据
   * @date 2023/5/09
   * @params: { String } cateId
   * @params: { String } userId

   * @return: { Object | null }
   */
  async findOneAndUpdateById(cateId, userId, updateData) {
    let result = await Cate.findOneAndUpdate(
      { _id: cateId, userId: userId },
      {
        $set: updateData,
      }
    )
    return result
  },
  /**
   * @Description: 分页查询,支持关键词查询
   * @date 2023/5/09
   * @params: { Number } page
   * @params: { Number } limit
   * @params: { Object } keyword
   * @return: { Object | null }
   */
  async findAll(page, limit, keyword = {}) {
    let result = await Cate.find(keyword)
      .sort({ updateTime: 1 })
      .skip((page) * limit)
      .limit(limit)
    console.log(result,'page res')
    return result
  },
}

module.exports = category
