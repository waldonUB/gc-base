// 相关文章
// https://juejin.cn/post/6844904046436843527#heading-19
import './index.scss'
import { service } from '@/config/http'
import { Upload, message, Button } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadProps } from 'antd'

const props: UploadProps = {
  onRemove: (file) => {},
  beforeUpload: (file) => {},
}

function PageUpload() {
  /**
   * description
   * @author waldon
   * @date 2022-05-26
   */
  function handleUpload() {
    service.post('http://127.0.0.1:4523/mock/909743/fileUpload').then((res: object) => {
      console.log('res', res)
    })
    const formData = new FormData()
    // fileList.forEach(file => {
    //   formData.append('files[]', file.originFileObj as RcFile);
    // });
    // You can use any AJAX library you like
    service.post('http://127.0.0.1:4523/mock/909743/fileUpload', formData).then((res: object) => {
      console.log('res', res)
    })
  }
  return (
    <div className="upload">
      <div className="page-header">
        <div className="left-part">
          <div className="page-title">文件上传</div>
        </div>
      </div>
      <div className="content-wrapper">
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Select File</Button>
        </Upload>
        <Button type="primary" onClick={handleUpload} style={{ marginTop: 16 }}>
          Start Upload
        </Button>
      </div>
    </div>
  )
}
export default PageUpload
