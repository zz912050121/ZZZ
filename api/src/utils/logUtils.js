const winston = require('winston')
require('winston-daily-rotate-file')

const config = require('../../config/apiconfig')


/**
 * 日志组件,每日生成一个日志文件. 根据操作日志
 * @namespace LoggerUtil
 * @description 日志组件: 含 http请求日志 和 操作日志 <br/>
 * Http 请求日志即每个请求做记录,主要用于复查异常请求.
 * 操作日志级别分为 error, warn, info, http, verbose, debug, silly (从高到低) <br/>
 * 操作日志记录根据行为划分, 原则如下：<br/>
 * opLogger 用于记录用户行为、关键操作、跳转；<br/>
 * payLogger 用于专门记录支付行为日志；<br/>
 * sqlLogger 用于记录 SQL(带值) 操作日志；<br/>
 * 注意: 日志打印时须加上 function 标签, 如 payLogger('#ccb pay# 支付失败'), 标明发生位置 <br/>
 * 注意: pm2 自带日志系统，但 pm2 logs 会记录每一个request和行为,全部混在一起，记录太多且不易排查 <br/>
 */


/**
 * @memberof LoggerUtil
 * @name 操作过程日志 opLogger
 * @description
 * 操作过程日志, 每天生成一个新日志，保留30天内的
 * @example
 * const { opLogger } = require('logUtil')
 * opLogger.info('msg string')
 * opLogger.error('error string')
 */
exports.opLogger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp({ format: 'YYYYMMDD HH:mm:ss' }), winston.format.simple()),
    transports: [
        new winston.transports.Console(), // 控制台输出
        new winston.transports.DailyRotateFile({
            filename: `${config.logPath}/op/op-%DATE%.log`,
            datePattern: 'YYYYMMDD',
            zippedArchive: false,
            maxFiles: '30d',
            eol: '\n\n', // 默认换一行，这里多换一行方便查看日志
        })
    ],
})


/**
 * @memberof LoggerUtil
 * @name 支付独立日志 payLogger
 * @description
 * 支付过程日志, 专门用于支付中参数和过程日志
 * @example
 * 用法 const { payLogger } = require('logUtil') <br/>
 * payLogger.info('msg string')
 * payLogger.error('error string')
 */
exports.payLogger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp({ format: 'YYYYMMDD HH:mm:ss' }), winston.format.simple()),
    transports: [
        new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            filename: `${config.logPath}/pay/pay-%DATE%.log`,
            datePattern: 'YYYYMMDD',
            zippedArchive: false,
            maxFiles: '30d',
            eol: '\n\n',
        })
    ],
})


/***
 * @memberof LoggerUtil
 * @name 数据库 sql 独立日志
 * @description
 * 已自动应用在数据库连接库中,请查阅 dbConn.js <br/>
 * 日志为： logs/sql/sql-%Date%.log <br/>
 * 每天生成一个新日志，保留30天内的
 */
const sqlLogger = winston.createLogger({
    format: winston.format.combine(winston.format.timestamp({ format: 'YYYYMMDD HH:mm:ss' }), winston.format.simple()),
    transports: [
        // new winston.transports.Console(),
        new winston.transports.DailyRotateFile({
            filename: `${config.logPath}/sql/sql-%DATE%.log`,
            datePattern: 'YYYYMMDD',
            zippedArchive: true,
            maxFiles: '30d',
            eol: '\n\n',
        })
    ],
})

exports.sqlLogger = (msg, benchmark) => {
    if (!benchmark) {
        return sqlLogger.info(msg)
    } else {
        return sqlLogger.info(`${msg} Elapsed time: ${benchmark}ms`)
    }
}