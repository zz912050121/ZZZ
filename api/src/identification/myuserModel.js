const sequelize = require('sequelize')

const dbConn = require('../utils/DBConn')

const conn = dbConn.getConn()


const myuser = conn.define(
    'user',
    {
        id: { type: sequelize.INTEGER, autoIncrement: true, primaryKey: true, unique: true },
        username: { type: sequelize.STRING, allowNull: true, comment: '账号' },
        password: { type: sequelize.STRING, allowNull: true, comment: '密码' },
    }, { paranoid: true }
)

module.exports = myuser