var crypto=require('crypto')


function Md5Password(password){

var md5=crypto.createHash('md5')
var Md5password=md5.update(password).digest('hex')


return Md5password

}

module.exports={
    Md5Password
}