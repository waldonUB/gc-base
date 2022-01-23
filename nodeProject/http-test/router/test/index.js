const express = require('express')
const router = express.Router()

router.get('/cache-test', async (req, res) => {
  // res.setHeader('Cache-Control', 'max-age=86400')
  console.log(`进来了`)
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, 5000)
  })
  console.log(`醒了`)
  res.render('test/cache')
})

router.post('/form-post', async (req, res) => {
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

module.exports = router
