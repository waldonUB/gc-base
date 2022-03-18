// https://www.npmjs.com/package/formidable 上传文件的依赖的文档
// https://github.com/expressjs/multer/blob/master/doc/README-zh-cn.md 这个感觉更简单易用，且有多语言文档
const express = require('express')
const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploadFiles')
  },
  filename: function (req, file, cb) {
    // todo waldon 文件名处理问题，和文件名乱码问题
    cb(null, file.fieldname + '-' + Date.now())
  },
})

const upload = multer({ storage: storage })
const router = express.Router()

/**
 * 单个文件上传
 * @author waldon
 * @date 2022-03-05
 */
const uploadSingle = upload.single('file')
router.post('/upload-single', async (req, res) => {
  uploadSingle(req, res, function (err) {
    console.log('单个文件上传', req)
    if (err instanceof multer.MulterError) {
      // 发生错误
    } else if (err) {
      // 发生错误
    }
    res.json({
      rt: 0,
      success: true,
      msg: '文件上传成功',
    })

    // 一切都好
  })
})

/**
 * 多文件上传
 * @author waldon
 * @date 2022-03-05
 */
router.post('/upload-multipart', upload.array('files', 12), function (req, res, next) {
  // req.files 是 `photos` 文件数组的信息
  console.log('req.file', req.files)
  // req.body 将具有文本域数据，如果存在的话
})

/**
 * 判断是否formData
 * @author waldon
 * @date 2022-03-05
 */
function isFormData(req) {
  let type = req.headers['content-type'] || ''
  return type.includes('multipart/form-data')
}

module.exports = router
