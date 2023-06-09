'use strict'
module.exports = {
  name: 'order',
  schema: {
    customerId: String, // 下单用户id
    merchantID: String, // 关联的商家id
    orderDate: String, // 订单日期
    totalAmount: Number, // 订单总金额
    productID: Array, // 商品id
    orderStatus: String, // 订单状态 todo 需考虑流转状态的设计
    paymentStatus: String, // 支付状态 todo 需考虑流转状态的设计
    createTime: Date, // 创建时间
    updateTime: Date, // 更新时间
  },
}
