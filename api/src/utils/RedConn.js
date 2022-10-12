const redis = require('redis')
const apiconfig = require('../../config/apiconfig')
const { opLogger } = require('../utils/logUtils')

const Redisclient = redis.createClient(apiconfig.rds_port,apiconfig.rds_host)

Redisclient.on('error', err => {
    console.error(err);
})

exports.getRds = (key) => {
    return Redisclient.get(key, function(err, res){
        if(err){
        opLogger.error(`#redis# get失败, error: ${error}`)
        } else {
            console.log('token取出成功')
        }
    })
}

exports.setRds = (key, value) => {
    return Redisclient.set( key, value, function(err, res){
        if(err){
        opLogger.error(`#redis# set 失败, error: ${error}`)
        } 

        console.log('token缓存redis成功')
        Redisclient.expire(key, 3600)
    })
}