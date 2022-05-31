// 可以YouTube搜索virtual-scroll看看有没有更好的解决方案
// todo waldon 写一个不定高的聊天记录的虚拟滚动列表
import './index.scss'
import { useEffect, useState, useCallback, Fragment } from 'react'
import { service } from '@/config/http'

interface chatDef {
  id: number
  name: string
  message: string
  type: string
  isShow: boolean
}

const VirtualScroll = function () {
  const [chatList, setChatList] = useState<chatDef[]>([])
  useEffect(() => {
    service.get('http://127.0.0.1:4523/mock/909743/getChatList').then((res) => {
      setChatList(res.data.data)

      const observer = new IntersectionObserver(function (changes) {
        if (!changes[0].isIntersecting) {
          console.log('相交')
        } else {
          console.log('离开')
        }
      })
      const element: any = document.getElementById('virtual-scroll')
      console.log('element: ', element)

      observer.observe(element)
    })
    return function () {
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
        <div className="scroll-box">
          {/* // todo waldon 头像左右的问题 */}
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
