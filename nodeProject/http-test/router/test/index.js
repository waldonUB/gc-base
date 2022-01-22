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
 * @author waldon
 * @date 2022-01-21
 */
router.post('/stored-xss', async (req, res) => {
  res.json({
    data: {
      content: `
        <div>
          我是存储型xss的留言板<script>console.log('xss success')</script>
        </div>
      `,
    },
    rt: 0,
    success: true,
    msg: '请求成功',
  })
})

module.exports = router
