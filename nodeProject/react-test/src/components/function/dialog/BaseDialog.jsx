import { Button, Modal } from 'antd'
import { useState } from 'react'

function BaseDialog() {
  const [isShowReduxDialog, setIsShowReduxDialog] = useState(false)
  const [list, setList] = useState([])
  const handleOk = () => {
    setIsShowReduxDialog(false)
  }
  const handleCancel = () => {
    setIsShowReduxDialog(false)
  }

  return (
    <div className="all-dialog">
      <div className="btn-list">
        <Button
          type="primary"
          onClick={() => {
            setIsShowReduxDialog(true)
          }}
        >
          测试redux用法
        </Button>
      </div>
      <div className="text-list">
        {list.map((item) => (
          <Button type=""></Button>
        ))}
      </div>
      {/* todo waldon: 暂时不理，好像是antd版本的问题
       Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of DomWrapper which is inside StrictMode */}
      <Modal
        title="Basic Modal"
        visible={isShowReduxDialog}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p></p>
      </Modal>
    </div>
  )
}
export default BaseDialog
