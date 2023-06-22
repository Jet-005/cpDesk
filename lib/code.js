// 1-表示分类模块 11-表示新增 依次类推
const codes = {
    '': 'error'
}
module.exports = (code) => {
    return codes[code]
}