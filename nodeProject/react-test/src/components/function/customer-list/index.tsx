import './index.scss'
import { Button, Tabs, Input } from 'antd'
import PageTab from './components/Tabs'
import PageTable from './components/Table'
import AddDialog from './components/AddDialog'
import GlButton from '@/components/base/GlButton'
import { useEffect, useState, useCallback, Fragment } from 'react'
import { service } from '@/config/http'
import { useNavigate } from 'react-router-dom'

const tabList = [
  {
    key: 'all',
    value: '全部',
  },
  {
    key: 'wxWork',
    value: '企微客户',
  },
  {
    key: 'normal',
    value: '普通客户',
  },
]

/**
 * 行数据
 * @author waldon
 * @date 2022-05-25
 */
type rowDataDef = {
  id: string
}

/**
 * 行数据
 * @author waldon
 * @date 2022-05-25
 */
type inputDef = {
  target: any
}

function CustomerList() {
  console.log('CustomerList')
  const [curTab, setCurTab] = useState('all')
  let [tableList, setTableList] = useState([])
  const [isShowReduxDialog, setIsShowReduxDialog] = useState(false)
  useEffect(() => {
    service.get('http://127.0.0.1:4523/mock/909743/getCustomerList').then((res) => {
      setTableList(res.data.data)
    })
    return function () {
      // 需要在 componentWillUnmount 执行的内容
    }
  }, [])

  const changeInput = (e: inputDef) => {
    console.log('changeInput: ', e.target.value)
  }
  /**
   * 更改tab
   * @author waldon
   * @date 2022-05-17
   * @param {*} key - param
   */
  const changeTab = (key: string): void => {
    setCurTab(key)
  }

  /**
   * 删除行
   * @author waldon
   * @date 2022-05-17
   * @param {*} rowData - param
   */
  const delRow = (rowData: rowDataDef): void => {
    tableList = tableList.filter((item: rowDataDef) => item.id !== rowData.id)
    setTableList(tableList)
  }

  const navigate = useNavigate()
  /**
   * 进入详情
   * @author waldon
   * @date 2022-05-17
   */
  const gotoDetail = () => {
    console.log('进入详情')
    console.log(`useLocation`, navigate)
    navigate('/CustomerDetail')
  }

  return (
    <Fragment>
      <div className="customer-list">
        <div className="page-header">
          <div className="left-part">
            <div className="page-title">客户列表</div>
          </div>
          <div className="right-part">
            <div className="button-operate">
              <Button type="primary" className="btn" onClick={gotoDetail}>
                录入客户
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
          <div className="filter-wrapper">
            <Input
              className="ft-child filter-input"
              placeholder="输入内容"
              onChange={changeInput}
            />
            <GlButton type="primary">搜索</GlButton>
          </div>
          <div className="table-wrapper">
            <PageTable tableList={tableList} delRow={delRow} />
          </div>
        </div>
        <AddDialog
          isShowReduxDialog={isShowReduxDialog}
          setIsShowReduxDialog={setIsShowReduxDialog}
        />
      </div>
      <div className="list-2"></div>
    </Fragment>
  )
}
export default CustomerList
