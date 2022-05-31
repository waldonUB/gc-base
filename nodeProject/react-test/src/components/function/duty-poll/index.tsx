import PageTab from './components/Tabs'
import { Button } from 'antd'

const tabList: [] = []

function DutyPoll() {
  function addRobot() {}
  function setIsShowReduxDialog(isShow: boolean) {}
  function changeTab() {}

  return (
    <div className="customer-list">
      <div className="page-header">
        <div className="left-part">
          <div className="page-title">客户列表</div>
        </div>
        <div className="right-part">
          <div className="button-operate">
            <Button type="primary" className="btn" onClick={addRobot}>
              添加机器人
            </Button>
            <Button
              type="primary"
              className="btn"
              onClick={() => {
                setIsShowReduxDialog(true)
              }}
            >
              批量导入
            </Button>
            <Button type="primary" className="btn">
              同步企微客户
            </Button>
            <Button type="primary" className="btn">
              客户查重
            </Button>
          </div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="tab-wrapper">
          <PageTab tabList={tabList} changeTab={changeTab} />
        </div>
      </div>
    </div>
  )
}

export default DutyPoll
