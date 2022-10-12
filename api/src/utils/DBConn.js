const Sequelize = require('sequelize')

const { sqlLogger } = require('./logUtils')
const apiconfig = require('../../config/apiconfig')

const printSqlLogger = (msg, benchmark) => {
    sqlLogger(msg, benchmark)
}

/*
 * 数据库连接公共方法
 */
const conn = new Sequelize(apiconfig.db_database, apiconfig.db_username, apiconfig.db_password, {
    host: apiconfig.db_host,
    port: apiconfig.db_port,
    dialect: apiconfig.db_type,
    pool: {
        maxConnections: apiconfig.db_maxConnection,
        maxIdleTime: apiconfig.db_maxIdleTime,
    },
    dialectOptions: {
        charset: apiconfig.db_charset,

        // 文档上说 typeCast 默认值为 true,如果要将数据做强制转换必须显式设置，因此不能不写。
        dateStrings: true, // 强制日期类型(时间戳，日期时间，日期)作为字符串返回而不是将其注入到JavaScript日期对象中
        typeCast: true, // 覆盖了sequelize的转换，看代码，目前只影响date和GEOMETRY，能用
    },
    timezone: '+08:00',
    benchmark: true, // 打印 sql 执行时间
    logQueryParameters: true, // 绑定 sql 参数到日志中，避免出现参数为 ? 无法使用日志还原数据的问题
    logging: printSqlLogger,
})

exports.getConn = () => {
    return conn
}
