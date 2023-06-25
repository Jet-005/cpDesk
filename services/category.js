const Cate = require("../models/index").getModel("category")

const category = {
  /**
   * @Description:根据cateId跟userid查找分类
   * @date 2023/5/09
   * @params: { String } cateId
   * @params: { String } userId
   * @return: { Object | null }
   */
  async findOneById(cateId) {
    let result = await Cate.findOne({ _id: cateId }, { __v: 0 })
    return result
  },
  /**
   * @Description: 插入新分类数据
   * @date 2023/5/09
   * @params: { Object } data
   * @return: { Object | null }
   */
  async create(data) {
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
  async findOneAndUpdateById(cateId, updateData) {
    let result = await Cate.findOneAndUpdate(
      { _id: cateId },
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
   * @params: { String } userId
   * @params: { Object } keyword
   * @return: { Object | null }
   */
  async findAll(page, limit, userId, keyword = {}) {
    keyword.userId = userId
    let result = await Cate.find(keyword)
      .sort({ createTime: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
    return result
  },
  /**
   * @Description: 查询符合条件的数据总数
   * @date 2023/5/09
   * @params: { String } userId
   * @params: { Object } keyword
   * @return: { Object | null }
   */
  async count(userId, keyword = {}) {
    keyword.userId = userId
    let result = await Cate.countDocuments(keyword)
    return result
  },
  // /**
  //  * @Description: 分页查询,支持关键词查询
  //  * @date 2023/5/09
  //  * @params: { Number } page
  //  * @params: { Number } limit
  //  * @params: { Object } keyword
  //  * @return: { Object | null }
  //  */
  // async findAll(page, limit, keyword = {}) {
  //   let result = await Cate.find(keyword)
  //     .sort({ createTime: 1 })
  //     .skip(page * limit)
  //     .limit(limit)
  //   console.log(result, "page res")
  //   return result
  // },
}

module.exports = category
