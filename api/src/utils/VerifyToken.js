const jwt = require('../utils/jwt')
const { opLogger } = require('./logUtils')
const redis = require('./RedConn')

exports.verify = async(username) => {

const token = redis.getRds(username)
const patload = jwt.getToken(token)
        
if (patload.username === username) {
            
    return true
}
    return false
}