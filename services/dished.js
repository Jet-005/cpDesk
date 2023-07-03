const Dished = require("../models/index").getModel("dished");

const dished = {
  /**
   * @Description:根据dishedid查找用户对应的分类菜品
   * @date 2023/5/09
   * @params: { String } dishedid
   * @return: { Object | null }
   */
  async findOneById(dishedid) {
    let result = await Dished.findOne({ _id: dishedid }, { __v: 0 });
    return result;
  },
  /**
   * @Description: 插入新菜品数据
   * @date 2023/5/09
   * @params: { Object } data
   * @return: { Object | null }
   */
  async create(data) {
    let result = await Dished.create(data);
    return result;
  },
  /**
   * @Description: 根据Dishedid更新数据
   * @date 2023/5/09
   * @params: { String } DishedId
   * @return: { Object | null }
   */
  async findOneAndUpdateById(dishedId, updateData) {
    let result = await Dished.findOneAndUpdate(
      { _id: dishedId },
      {
        $set: updateData,
      }
    );
    return result;
  },
  /**
   * @Description: 根据categoryId查所有的菜品
   * @date 2023/5/09
   * @params: { Number } page
   * @params: { Number } limit
   * @params: { String } cateId
   * @params: { Object } keyword
   * @return: { Object | null }
   */
  async findDishedsByCategory(page, limit, cateId, keyword = {}) {
    keyword.cateId = cateId;
    let result = await Dished.find(keyword)
      .sort({ createTime: 1 })
      .skip((page - 1) * limit)
      .limit(limit);
    return result;
  },
  /**
   * @Description: 查询符合条件的数据总数
   * @date 2023/5/09
   * @params: { String } cateId
   * @params: { Object } keyword
   * @return: { Object | null }
   */
  async count(cateId, keyword = {}) {
    keyword.cateId = cateId;
    let result = await Dished.countDocuments(keyword);
    return result;
  },
};

module.exports = dished;
