/**
 * 测试富文本编辑器
 * @author waldon
 * @date 2022-05-25
 */
import './index.scss'
import { Button, Tabs, Input } from 'antd'

function Editor() {
  /**
   * 添加文字
   * @author waldon
   * @date 2022-05-25
   */
  function setText() {
    // execCommand 已经被废弃了
    document.execCommand('insertHTML', false, '<div>1111</div>')
  }
  return (
    <div className="editor">
      <div className="page-header">
        <div className="left-part">
          <div className="page-title">富文本编辑器</div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="operate-box">
          <Button type="primary" onClick={setText}>
            插入文字
          </Button>
        </div>
        <div className="editor-area" contentEditable={true}></div>
      </div>
    </div>
  )
}
export default Editor
