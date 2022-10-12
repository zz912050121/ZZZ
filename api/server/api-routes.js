const { opLogger } = require('../src/utils/logUtils')
const loginController = require('../src/identification/loginController')
const interface = require('../src/identification/interface')


module.exports = (express, app, config) => {
    const router = express.Router()

    router.post('/login', loginController.login)

    router.post('/regist', loginController.regist)


    // 确保是在最后加载，否则会覆盖其他路由
    router.get('*', (req, res) => {
        opLogger.error(`#ErrorURL# hostname=${req.hostname}, ip=${req.ip}, GET ${req.baseUrl} is not exist`)
        res.status(200).json({ errCode: 404, errMsg: `Sorry! ${req.baseUrl} does not exist! 抱歉！${req.baseUrl}不存在！` })
    })
    router.post('*', (req, res) => {
        opLogger.error(`#ErrorURL# hostname=${req.hostname}, ip=${req.ip}, POST ${req.baseUrl} is not exist`)
        res.status(200).json({ errCode: 404, errMsg: `Sorry! ${req.baseUrl} does not exist! 抱歉！${req.baseUrl}不存在！` })
    })


    /**
     * @memberof API-Core
     * @name 路由前缀 /api
     */
    app.use('/Projects/api/', router)
    
}