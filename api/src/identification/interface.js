const request = require('superagent')
const { opLogger } = require('../utils/logUtils')


exports.LoginSMS = async(req, res) => {
    const { phone } = req.body

    const LoginSMS = await request.post('http://fengyi.sxqhui.com/api.html')    //url链接
        .query({
           code: "login",            //请求参数
           method: "user.sms",
           mobile: phone
        }) 
        .set('Accept', 'application/json')

        console.log(LoginSMS.body);
    return LoginSMS
}


exports.LoginApp = async(req, res) => {
    const { phone, code } = req.body

    const Login = await request.post('http://fengyi.sxqhui.com/api.html')    //url链接
        .query({
            code,
            mobile: phone,
            method: "user.smslogin"
        })
        .set('Accept', 'application/json')

        console.log(Login.body);
    return Login
}


exports.RegistSMS = async(req, res) => {
    const { phone } = req.body

    const RegistSMS = await request.get('')    //url链接
        .query({
                                    //请求参数
        }) 
        .set('Accept', 'application/json')

    return RegistSMS

}


exports.Regist = async(req, res) => {
    const { phone, code } = req.body

    const Regist = request.get('')    //url链接
        .query({
                                    //请求参数
        }) 
        .set('Accept', 'application/json')

    return Regist
}


exports.Operation = async(req, res) => {

    const{ aid, uuid, spider } = req.body
    
    const opera = await request.get(`https://api.juejin.cn/interact_api/v1/message/count?aid=${aid}&uuid=${uuid}&spider=${spider}`)
    .set('Accept', 'application/json')
    .set('Cookie', '_ga=GA1.2.1691881972.1661995205; MONITOR_WEB_ID=dca1bcec-9165-4ae4-b5b6-b843892eaba3; __tea_cookie_tokens_2608=%257B%2522web_id%2522%253A%25227138215032974493214%2522%252C%2522user_unique_id%2522%253A%25227138215032974493214%2522%252C%2522timestamp%2522%253A1661995206126%257D; _tea_utm_cache_2608={%22utm_source%22:%22jj_nav%22}; passport_csrf_token=9aa1bcb6b442f87b20edeeb51fab185f; passport_csrf_token_default=9aa1bcb6b442f87b20edeeb51fab185f; odin_tt=6fd8321b7a52e0f3007e3b0578df100cbe21a016080da6b55fade51ad59b36fd5728157ec596aaa317240559a21d86a61bb7da968ff33386763ee3803a96986a; n_mh=leqHBh6G5j2zFLY34edplAVrykElKhpu4WLTFR4iddk; passport_auth_status=faf312199f0821a535d640408a249845%2C; passport_auth_status_ss=faf312199f0821a535d640408a249845%2C; sid_guard=ca803c92232f965dce349c7e801b5207%7C1664155867%7C31536000%7CTue%2C+26-Sep-2023+01%3A31%3A07+GMT; uid_tt=b4bc45c94df5fc3dd9d9d99b60a6567b; uid_tt_ss=b4bc45c94df5fc3dd9d9d99b60a6567b; sid_tt=ca803c92232f965dce349c7e801b5207; sessionid=ca803c92232f965dce349c7e801b5207; sessionid_ss=ca803c92232f965dce349c7e801b5207; sid_ucp_v1=1.0.0-KGEyZjA0NzcxZWZjNTE5NzU2NTg4ZjdhNTUzOWRjMTJjY2M3YTRjNDQKFwjoiYCAsYynAxDbgcSZBhiwFDgCQOwHGgJsZiIgY2E4MDNjOTIyMzJmOTY1ZGNlMzQ5YzdlODAxYjUyMDc; ssid_ucp_v1=1.0.0-KGEyZjA0NzcxZWZjNTE5NzU2NTg4ZjdhNTUzOWRjMTJjY2M3YTRjNDQKFwjoiYCAsYynAxDbgcSZBhiwFDgCQOwHGgJsZiIgY2E4MDNjOTIyMzJmOTY1ZGNlMzQ5YzdlODAxYjUyMDc; _gid=GA1.2.199308721.1665362967')
    .set('referer', 'https://juejin.cn/user/center/signin?avatar_menu')
    .set('user-agent', 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/86.0.4240.198 Safari/537.36')

    console.log(opera);

    res.send(opera)

    return opera

}