const { opLogger } = require('../utils/logUtils')

const IdenModel = require('./myuserModel')
const CardPass = require('./CardPassModel')
const Crypto = require('../utils/CryptData')
const redis = require('../utils/RedConn')
const jwt = require('../utils/jwt')
const VerifyToken = require('../utils/VerifyToken')

const sequelize = require('sequelize');
const dbConn = require('../utils/DBConn')
const conn = dbConn.getConn()

exports.login = async( req, res ) => {

    const { username, password: Mpass } = req.body
    console.log(username);
        try{
            
            loginIden = await IdenModel.findOne({ where: { username, password: Crypto.Md5Password(Mpass) } })

            if(loginIden){

                const payload = await jwt.getPayload(username)

                const token = await jwt.setToken(payload)

                if(token){
                    newRedis = await redis.setRds(token, username)

                    opLogger.info('#loginController.login# 登录成功！')
                    //res.status(200).json({ resultcode: 200, message: '登录成功！' , Authorization: token})
                    res.redirect('/Projects/api/main')
                } else {
                opLogger.info('#loginController.login# 登录成功! 但token生成失败')
                res.status(200).json({ resultcode: 200, message: '登录成功! 但token生成失败' })
                
                }
            } else {
                opLogger.info('#loginController.login# 登录失败, 密码错误！或账号不存在！')
                res.status(200).json({ resultcode: 500, message: '登录失败, 密码错误！或账号不存在！' })
            
            }

        } catch (error) {
            opLogger.error(`#loginController.login# 登录失败, error: ${error}`)
            res.status(200).json({ resultcode: 4000, message: `登录失败, error: ${error}` })
        
        }
    
}


exports.regist = async( req, res ) => {
    res.type = 'json'
    const { username, password: Mpass , card } = req.body
    opLogger.info(`#idenController.regist# 收到需注册信息 username=${username}`)
    try{
        const data = {
            username,
            password: Crypto.Md5Password(Mpass)
        }
        loginIden = await IdenModel.findOne({ where: { username, password: Crypto.Md5Password(Mpass) } })
        
        if(!loginIden) {

            const ReadIden = await CardPass.findOne({where: {card}})

            if (ReadIden) {

                if (ReadIden.use === 0) {

                    newIden = await IdenModel.create(data)

                        if(newIden){
                            
                            const UseCard = await CardPass.update({ use:1 }, {where: {card}})

                                if (UseCard) {
                                    opLogger.info('#loginController.regist# 注册成功！')
                                    res.status(200).json({ resultcode: 200, message: '注册成功！' })   
                                } else {
                                    opLogger.info('#loginController.regist# 注册成功！id状态修改失败')
                                    res.status(200).json({ resultcode: 200, message: '注册成功！id状态修改失败' })    
                                }
                    } else {
                        opLogger.info('#loginController.regist# 注册失败！')
                        res.status(200).json({ resultcode: 400, message: '注册失败！' })
                    }
                } else {
                    opLogger.info('#loginController.regist# 注册失败！id已使用！')
                    res.status(200).json({ resultcode: 500, message: '注册失败！id已使用！' })
                }
            } else {
                opLogger.info('#loginController.regist# 注册失败！卡密不存在！')
                res.status(200).json({ resultcode: 4000, message: '注册失败！id不存在' })
            }
        } else {
            opLogger.info('#loginController.regist# 已注册！')
            res.status(200).json({ resultcode: 5000, message: '已注册！' })
        }
    } catch (e) {
        opLogger.error(`#loginController.regist# 注册失败! error = ${e}`)
        res.status(200).json({ resultcode: 440, message: `注册失败! error = ${e}` })
    }
}


exports.ceshi = async( req, res ) =>{

    const { username, password: Mpass } = req.body

    conn.query(`select * from users where username='${username}'`, {type: sequelize.QueryTypes.SELECT}).then(loginIden=>{
    
    console.log(loginIden);

    res.send(loginIden)
    })
}

notToken = async(req) => {
    Authorization = req.headers['Authorization']
    const wuhu = false
    if (!Authorization) {
        return true
    }
    return wuhu
}

