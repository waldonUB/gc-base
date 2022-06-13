// 可以YouTube搜索virtual-scroll看看有没有更好的解决方案
/*
1. 除去padding，一屏的高度是600px
2. 设每块的初始高度是50px
3. margin-bottom是10px
*/
import './index.scss'
import { useEffect, useState, useCallback, Fragment, useRef } from 'react'
import { service } from '@/config/http'

interface chatDef {
  id: number
  name: string
  message: string
  type: string
  isShow: boolean
}

const FIXED_HEIGHT = 50
const GAP = 10
// const CAL_NUM = 15
const SHOW_NUM = 20
let curScreen = 0

const VirtualScroll = function () {
  const [chatList, setChatList] = useState<chatDef[]>([])
  const chatRef: any = useRef()

  /**
   * description
   * @author waldon
   * @date 2022-06-02
   * @param {*} param - param
   */
  const handlerScroll = function (e: any) {
    // todo waldon 为空的，再看看。用ref存储解决了？是正规的方案吗？
    // todo waldon setList不是会很吃渲染性能吗？如何解决
    // console.log('chatList', chatRef.current)

    console.log('监听滚动', e.target.scrollTop)
    const top = e.target.scrollTop
    const scrollScreen = Math.round(top / ((FIXED_HEIGHT + GAP) * SHOW_NUM))
    console.log(`scrollScreen`, scrollScreen)
    if (scrollScreen !== curScreen) {
      curScreen = scrollScreen
      const list = chatRef.current.map((item: chatDef, index: number) => {
        let isShow
        if (index > SHOW_NUM * (curScreen - 1) && index < SHOW_NUM * curScreen) {
          isShow = true
        } else {
          isShow = false
        }
        return {
          ...item,
          isShow,
        }
      })
      chatRef.current = list
      setChatList(list)
    }
  }

  useEffect(() => {
    service.get('http://127.0.0.1:4523/mock/909743/getChatList').then((res) => {
      const list = res.data.data.map((item: chatDef, index: number) => {
        let isShow
        if (index < 20) {
          isShow = true
        } else {
          isShow = false
        }
        return {
          ...item,
          isShow,
        }
      })
      setChatList(list)
      chatRef.current = list
    })
    const scrollBox = document.getElementById('scroll-box')
    scrollBox?.addEventListener('scroll', handlerScroll)
    return function () {
      const scrollBox = document.getElementById('scroll-box')
      scrollBox?.removeEventListener('scroll', handlerScroll)
      // 需要在 componentWillUnmount 执行的内容
    }
  }, [])

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
        <div id="scroll-box" className="scroll-box">
          {chatList.map((item) => {
            let _class: string = ''
            if (item.type === 'send') {
              _class = 'message send'
            } else {
              _class = 'message receive'
            }
            return (
              <div key={item.id} className="message-wrapper">
                {item.isShow && (
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
                    <div className="text">{item.message}</div>
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
                )}
                {!item.isShow && <div className="fake-box"></div>}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
export default VirtualScroll
