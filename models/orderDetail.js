'use strict'
module.exports = {
  name: 'order',
  schema: {
    orderId: String, // 订单id
    quantity: Number, // 商品的数量
    orderDate: String, // 订单日期
    totalAmount: Number, // 订单总金额
    orderStatus: String, // 订单状态 todo 需考虑流转状态的设计
    paymentStatus: String, // 支付状态 todo 需考虑流转状态的设计
    createTime: Date, // 创建时间
    updateTime: Date, // 更新时间
  },
}
