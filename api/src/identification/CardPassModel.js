const sequelize = require('sequelize')

const dbConn = require('../utils/DBConn')

const conn = dbConn.getConn()


const CardPass = conn.define(
    'card',
    {
        cid: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
        card: { type: sequelize.STRING, allowNull: true, comment: '卡密' },
        use: { type: sequelize.INTEGER, allowNull: true, defaultValue: 0, comment: '使用情况' },
    }, { paranoid: true }
)

module.exports = CardPass