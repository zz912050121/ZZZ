const fs = require('fs')
const morgan = require('morgan') // HTTP request logger
const fsr = require('file-stream-rotator') // 每天自动生成一个日志文件

const compression = require('compression') // Http Request 压缩
const errorhandler = require('errorhandler')


module.exports = (express, app, env, config) => {
    
    app.set('trust proxy', 1) // 信任反向代理层,即Nginx,用于 Https 的信任

    app.use(express.urlencoded({ extended: true })) // 解析请求体

    app.use(express.json())

    /***
     * 服务器请求日志,便于复查对方向我方服务器发起的请求,无论是否处理都打印
     */
    const logDirectory = `${config.logPath}/req/`

    // 确保日志文件存在
    if (!fs.existsSync(logDirectory)) {
        fs.mkdirSync(logDirectory, {recursive: true})
    }

    // 创建一个循环的写入流
    const accessLogStream = fsr.getStream({
        date_format: 'YYYYMMDD',
        filename: `${logDirectory}/req-%DATE%.log`,
        frequency: 'daily',
        verbose: false
    })

    app.use(morgan('short', { stream: accessLogStream }))
    // end morgan request log


    // compress
    app.use(compression({ threshhold: 512 }, (req, res) => /json|text|javascript|css/.test(res.getHeader('Content-Type')), { level: 9 }))

    // Cross-Domain Allow Security
    app.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', req.headers.origin)
        res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-type, X-Requested-With')
        res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE')
        // res.header('Access-Control-Request-Headers', 'X-Requested-With')
        res.header('Access-Control-Allow-Credentials', 'true')

        // 有些浏览器（例如 chrome）会预先发送 OPTIONS 请求确认连接是否可用，直接返回可用，并设置有效期即可
        // 这个 OPTIONS 请求也会生成对应的 session，但是不再复用，需要手动销毁（不然 redis 会看到一大堆的无效 session）
        if (req.method === 'OPTIONS') {
            res.header('Access-Control-Max-Age', 7200)
            res.status(200).end()
            return
        }

        next()
    })


    if (env === 'development') {
        app.locals.pretty = true // 格式化输出
        app.use(errorhandler({ dumpExceptions: true, showStack: true })) // 开发环境错误处理
    }

    // if (env === 'production') {}
}
