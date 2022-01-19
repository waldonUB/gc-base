const express = require('express')
const router = express.Router()

router.get('/cache-test', (req, res) => {
  // res.setHeader('Cache-Control', 'max-age=86400')
  console.log(`进来了`)
  res.render('test/cache')
})

router.post('/form-post', (req, res) => {
  res.json({
    rt: 0,
    success: true,
    msg: '表单请求成功',
  })
})

module.exports = router
