const jwt = require('jsonwebtoken')
const config = require('../../config/apiconfig')


exports.getPayload = (user)=>{
    const payload = {
        "username": "",
        "iss":"zhangweijia",
        "aud":"no adress",
        "sub":"everyone",
    }    
    payload.username = user

    return payload
    }

exports.setToken = (load) => {
    const token = jwt.sign(load, config.rds_secret, { expiresIn: 3600 })
    return token
}


exports.getToken = (token) => {
    jwt.verify(token, config.rds_secret, (error, decoded) => {
        if (error) {
            console.log(error.message);
            return
        }
        return decoded
    })
}