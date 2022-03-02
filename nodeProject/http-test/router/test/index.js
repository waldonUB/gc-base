const express = require('express')
const router = express.Router()

router.get('/cache-test', async (req, res) => {
  // res.setHeader('Cache-Control', 'max-age=86400')
  console.log('cache-test请求头信息', req.headers)
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 5000)
  })
  console.log(`醒了`)
  res.render('test/cache')
})

router.get('/request-test', async (req, res) => {
  res.render('test/requestTest')
})

router.post('/form-post', async (req, res) => {
  console.log(req)
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 5000)
  })
  res.json({
    rt: 0,
    success: true,
    msg: '表单请求成功',
  })
})

/**
 * 测试存储型xss
 * 两种解决方案：
 * 1. 给前端渲染
 * 2. 给可能造成xss的东西做充分转义。比如说encodeHtml（本质上也是replace了一些关键符号），也会有一些库专门的处理这一方面
 * @author waldon
 * @date 2022-01-21
 */
router.get('/stored-xss', async (req, res) => {
  const content = `
    <div>
      我是存储型xss的留言板<script>console.log('xss success')</script>
    </div>
    <div>
      测试转义后的xss &lt;script&gt;console.log(&#39;xss success&#39;)&lt;/script&gt;
    </div>
  `
  res.send(content)
})

/**
 * 服务端渲染的cookie测试页面
 * @author waldon
 * @date 2022-01-27
 */
router.get('/get_cookieTestPage', async (req, res) => {
  console.log('get_cookieTestPage请求头信息', req.headers)
  res.render('test/cookieTest')
})

/**
 * 测试cookie的限制
 * @author waldon
 * @date 2022-01-21
 */
router.post('/cookie-limit', async (req, res) => {
  console.log('请求头信息', req.headers.cookie)
  res.setHeader('Set-Cookie', ['back_userName=waldon;HttpOnly;Secure', 'back_language=javascript'])
  res.json({
    rt: 0,
    success: true,
    msg: '表单请求成功',
  })
})

/**
 * 测试get请求的cookie的限制
 * @author waldon
 * @date 2022-01-21
 */
router.get('/cookie-limit-get', async (req, res) => {
  console.log('请求头信息', req.headers.cookie)
  res.setHeader('Set-Cookie', [
    'back_userName=waldon;HttpOnly;Secure',
    'back_language=javascript',
    'SameSite=Strict',
  ])
  res.json({
    rt: 0,
    success: true,
    msg: '表单请求成功',
  })
})

/**
 * 测试cookie的限制
 * @author waldon
 * @date 2022-01-21
 */
router.get('/jsonp-test', async (req, res) => {
  console.log('请求url', req.url)
  // 前端默认为callback时，res.jsonp会自动读取参数的回调
  // let callback = ''
  // if (!req.url.split('?')[1]) {
  //   console.log('无参数')
  //   return
  // }
  // if (!req.url.split('?')[1].split('=')[1]) {
  //   console.log('无回调')
  //   return
  // }
  // callback = req.url.split('?')[1].split('=')[1]
  res.jsonp('测试回调数据')
})

module.exports = router
