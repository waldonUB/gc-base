const express = require('express')
const path = require('path')
const fs = require('fs-extra')
const https = require('https')
const spdy = require('spdy')

const indexRouter = require('./router/index')
const testRouter = require('./router/test/index')
const privateKey = fs.readFileSync('./crt_resource/private.pem', 'utf8')
const certificate = fs.readFileSync('./crt_resource/file.crt', 'utf8')

const credentials = { key: privateKey, cert: certificate }
const port = 3001
const app = express()

// 指定模板存放目录
app.set('views', 'views')
// 指定模板引擎为 Handlebars
app.set('view engine', 'hbs')
app.use(
  express.static(path.resolve(__dirname, 'public'), {
    maxAge: 360000,
  }),
)
app.use(function (req, res, next) {
  res.set('Cache-control', 'public, max-age=300')
  next()
})
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500')
  res.setHeader('Access-Control-Allow-Credentials', true) //允许后端发送cookie
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method',
  )
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PATCH, PUT, DELETE')
  res.setHeader('Allow', 'GET, POST, PATCH, OPTIONS, PUT, DELETE')
  next()
})

app.use('/', indexRouter)
app.use('/test', testRouter)

app.listen(port, () => {
  console.log(`server running...`)
})

// const httpsServer = https.createServer(credentials, app)

// httpsServer.listen(port, () => {
//   console.log(`httpsServer running...`)
// })

// spdy.createServer(credentials, app).listen(port, () => {
//   console.log(`http2 running...`)
// })
