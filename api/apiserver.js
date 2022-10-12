const http = require('http')
const express = require('express')
const path = require('path')
const config = require('./config/apiconfig')
const { opLogger } = require('./src/utils/logUtils')


const app = express()

app.use('/Projects/api/login',express.static(path.join(__dirname,'/html/login.html')))
app.use('/Projects/api/main',express.static(path.join(__dirname,'/html/main.html')))

const env = process.env.NODE_ENV || 'development'
const port = process.env.PORT || config.apiport || 3000

app.set('env', env)
app.set('port', port)

require('./server/api-express')(express, app, env, config)
require('./server/api-routes')(express, app, config)

const server = http.createServer(app)

server.listen(port, () => {
    opLogger.info(`==> 🌐  ${config.name} 服务启动. URL=http://localhost:${port}/api, ENV=${env}`)
})
