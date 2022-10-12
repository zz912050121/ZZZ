const path = require('path')

module.exports = {
    name: 'Let Birds Fly',

    apiport: 8868,

    rootPath: path.resolve(__dirname, '../../'),
    logPath: path.resolve(__dirname, '../../logs'),
    reqUrl: 'https://',


    db_type: 'mysql',
    db_host: 'localhost',
    db_username: 'root',
    db_password: '123456',
    // db_host: 'localhost',
    // db_username: 'root',
    // db_password: 'bbzhu1234',

    db_database: 'myuser',
    db_port: 3306,
    db_charset: 'utf8mb4',
    db_maxConnection: 50,
    db_maxIdleTime: 30,

    rds_port: '6379',
    rds_host: '127.0.0.1',
    rds_secret: '0e755b316bc3d9c8cd588fe7f8d66b45'
}