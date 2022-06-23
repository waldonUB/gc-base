import { createRef, useEffect, useState } from 'react'
import { service } from '@/config/http'
import './index.scss'

interface chatDef {
  id: number
  name: string
  message: string
  type: string
  isShow: boolean
}
// 不定高的还没有尝试，但是可以通过文字宽度计算和图片高度计算来设置高度

// 高度计算不准确的时候，滚动的时候会抖动一下

// const FIXED_HEIGHT = 50
const FIXED_HEIGHT = 60

export default function VirtualScroll() {
  // todo waldon setData的时候卡一下的问题
  // 已知item高度、需要与item css高度保持一致
  const itemHeight = FIXED_HEIGHT
  const pageSize = 20
  // 原始数据源
  const [dataSource, setDataSource] = useState<any>([])
  const scrollRef: any = createRef()
  const [totalCount, setTotalCount] = useState(0)
  const [beforeCount, setBeforeCount] = useState(0)
  const [pageNum, setPageNum] = useState(1)
  // 真正渲染的数据
  const [showDataSource, setShowDataSource] = useState([])

  useEffect(() => {
    createDataSource()
  }, [])

  useEffect(() => {
    sliceShowDataSource()
  }, [pageNum, dataSource.length])

  const createDataSource = () => {
    service.get('http://127.0.0.1:4523/mock/909743/getChatList').then((res) => {
      const list = res.data.data.map((item: chatDef, index: number) => {
        return {
          ...item,
          index,
        }
      })
      setDataSource(list)
    })
  }

  const sliceShowDataSource = () => {
    const { showDataSource, beforeCount, totalCount } = getRenderData({
      pageNum: pageNum,
      pageSize: pageSize,
      dataSource: dataSource,
    })
    setShowDataSource(showDataSource)
    setBeforeCount(beforeCount)
    setTotalCount(totalCount)
  }

  // 获取最大页数
  const getMaxPageNum = () => {
    return getPageNum({
      scrollTop: scrollRef.current.scrollHeight - scrollRef.current.clientHeight,
      pageSize: pageSize,
      itemHeight: itemHeight,
    })
  }

  // 1、监听用户scroll事件
  // 2、实时计算页码
  // 3、如果页码发生改变，进行数据切片，重新渲染数据
  // 4、如果页码没有发生改变，保持不动
  const onScroll = () => {
    const maxPageNum = getMaxPageNum()
    const scrollPageNum = getPageNum({
      scrollTop: scrollRef.current.scrollTop,
      pageSize: pageSize,
      itemHeight: itemHeight,
    })
    const currPageNum = Math.min(scrollPageNum, maxPageNum)
    // console.log('当前scrollTop', scrollRef.current.scrollTop)
    // 如果当前页数保持不变
    if (currPageNum === pageNum) return
    // console.log('进入下一页')
    setPageNum(currPageNum)
  }

  // 计算分页
  const getPageNum = ({ scrollTop, pageSize, itemHeight }: any) => {
    const pageHeight = pageSize * itemHeight
    return Math.max(Math.floor(scrollTop / pageHeight), 1)
  }

  // 数据切片
  const getRenderData = ({ pageNum, pageSize, dataSource }: any) => {
    const startIndex = (pageNum - 1) * pageSize
    // 这里+2：想要保证顺畅的滑动，快速滑动不白屏，需要至少预留3页数据，前+中+后
    const endIndex = Math.min((pageNum + 2) * pageSize, dataSource.length)
    return {
      showDataSource: dataSource.slice(startIndex, endIndex),
      // 前置数量
      beforeCount: startIndex,
      totalCount: dataSource.length,
    }
  }

  return (
    <div id="virtual-scroll" className="virtual-scroll">
      <div className="page-header">
        <div className="left-part">
          <div className="page-title">虚拟滚动</div>
        </div>
        <div className="right-part">
          <div className="button-operate"></div>
        </div>
      </div>
      <div className="content-wrapper">
        <div className="scroll-wrapper" ref={scrollRef} onScroll={onScroll}>
          <div
            id="scroll-box"
            className="scroll-box"
            style={{ height: `${totalCount * itemHeight}px` }}
          >
            <div
              className="inner"
              style={{ transform: `translateY(${beforeCount * itemHeight}px)` }}
            >
              {showDataSource.map((item: any) => {
                let _class: string = ''
                if (item.type === 'send') {
                  _class = 'message send'
                } else {
                  _class = 'message receive'
                }
                return (
                  <div key={item.id} className="message-wrapper">
                    <div className={_class}>
                      {item.type === 'send' && (
                        <div className="user">
                          <img
                            className="img-content"
                            src="https://p26-passport.byteacctimg.com/img/user-avatar/9954bc0498b4b8f87115a329faeb7ef5~300x300.image"
                            alt=""
                          />
                        </div>
                      )}
                      <div className="text">{item.index + '_' + item.message}</div>
                      {item.type === 'receive' && (
                        <div className="user">
                          <img
                            className="img-content"
                            src="https://p26-passport.byteacctimg.com/img/user-avatar/9954bc0498b4b8f87115a329faeb7ef5~300x300.image"
                            alt=""
                          />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
