// const Black = require('../identification/myuserModel')
// Black.sync({ force: true })
//     .then(() => {
//         console.log(`----- 创建 blackModel Table 表成功 -----`)
//     })
//     .catch((err) => {
//         console.error(`----- blackModel Table 表创建失败: ${err} -----`)
//     })

const Black = require('../identification/CardPass')
Black.sync({ force: true })
    .then(() => {
        console.log(`----- 创建 blackModel Table 表成功 -----`)
    })
    .catch((err) => {
        console.error(`----- blackModel Table 表创建失败: ${err} -----`)
    })