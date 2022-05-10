import { Button, Modal, Input } from 'antd'
import { useState } from 'react'
import dialogStore from '@/stores/dialog/index.js'

function BaseDialog() {
  /* 同步测试逻辑 start */
  const [isShowReduxDialog, setIsShowReduxDialog] = useState(false)
  const [list, setList] = useState(dialogStore.getState())

  const handleOk = () => {
    setIsShowReduxDialog(false)
  }
  const handleCancel = () => {
    setIsShowReduxDialog(false)
  }

  let inputValue = ''
  const changeInput = (e) => {
    inputValue = e.target.value
  }

  const addTodo = () => {
    console.log('添加')
    dialogStore.dispatch({
      type: 'ADD_TODO',
      text: inputValue,
    })
    console.log(dialogStore.getState())
    setList(dialogStore.getState())
  }
  /* 同步测试逻辑 end */

  /* 异步测试逻辑 start */
  const [asyncText, setAsyncText] = useState(0)

  const changeText = () => {
    setTimeout(() => {
      // todo waldon 拆分reducer
      // todo waldon 还没有看看redux-thunk怎么用
      dialogStore.dispatch({
        type: 'CHANGE_TEXT',
        text: Math.random(),
      })
      setAsyncText(dialogStore.getState())
    }, 1000)
  }

  /* 异步测试逻辑 end */

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
        <Button type="primary" onClick={changeText}>
          测试redux-async用法
        </Button>
      </div>
      <ul className="text-list">
        {list.map((item) => (
          <li key={item.text}>{item.text}</li>
        ))}
      </ul>
      <ul className="async-wrapper">{asyncText}</ul>
      {/* todo waldon: 暂时不理，好像是antd版本的问题
       Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of DomWrapper which is inside StrictMode */}
      <Modal
        title="Basic Modal"
        visible={isShowReduxDialog}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          <Input placeholder="输入内容" onChange={changeInput} />
          <Button type="primary" onClick={addTodo}>
            添加
          </Button>
        </p>
      </Modal>
    </div>
  )
}
export default BaseDialog
