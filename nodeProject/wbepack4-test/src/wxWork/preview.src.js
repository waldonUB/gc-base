let mtButton = mtComponents.mtButton
let mtButtonWrapper = mtComponents.mtButtonWrapper
let mtIframe = mtComponents.mtIframe
let mtHeader = mtComponents.mtHeader
Mt_Util.router.preview = Vue.extend({
  name: 'preview',
  template: `
        <div class="preview">
            <mt-header :title="previewInfo.title"></mt-header>
            <mt-iframe 
                class="iframeBox"
                ref="phoneIframe"
                refName="formIframe"
                :src="previewInfo.previewUrl"
                @loaded="loading">
            </mt-iframe>
            <mt-buttonWrapper>
                <mt-button size="large" type="mainColor" @click="send">立即发送</mt-button>
            </mt-buttonWrapper>

        </div>
    `,
  data() {
    return {
      previewInfo: {},
      navSliderVal: 0 //0，文章；1，表单
    }
  },
  destroyed() {
    //离开页面时销毁loading
    Vue.prototype.$indicator.close()
  },
  created() {
    this.previewInfo = this.$route.query.item
    this.navSliderVal = this.$route.query.navSliderVal

    Vue.prototype.$indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    })
    document.body.scrollTop = 0
  },
  methods: {
    /**
     * iframe加载完成取消loading
     * @author guoyijie
     * @date 2020/8/13
     * */
    loading() {
      Vue.prototype.$indicator.close()
    },
    /**
     * 点击发送 调用生成接口
     * @author guoyijie
     * @date 2020/8/13
     * */
    send() {
      let ajaxUrl = ''
      let parems = {}
      if (this.navSliderVal == 0) {
        parems = {
          articleId: this.previewInfo.id,
          productAttribute: this.previewInfo.productAttribute
        }
        ajaxUrl = '/ajax/wxWork/article/tsArticle_h.jsp?cmd=getArticle'
      } else {
        parems = {
          formId: this.previewInfo.id
        }
        ajaxUrl = '/ajax/wxWork/form/tsForm_h.jsp?cmd=getFormInfo'
      }
      Mt_Util.post(ajaxUrl, parems).then((res) => {
        if (res.data && res.data.success) {
          let info = res.data.data
          this.sendMessage(info.url, info.coverTitle, info.coverImgUrl, info.coverContent)
        } else {
          this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
        }
      })
    },
    /**
     * 发送消息
     * @author guoyijie
     * @date 2020/8/13
     * @param {string} url链接 必填
     * @param {string} 缩略图标题 必填
     * @param {string} 缩略图封面 必填
     * @param {string} 缩略图正文 必填
     * */
    sendMessage(url, title, img, content) {
      params = {
        msgtype: 'news',
        news: {
          link: url,
          title: title,
          desc: content,
          imgUrl: img
        }
      }
      Mt_Util.sendChatMessage(params)
    }
  },
  components: {
    mtButton,
    mtButtonWrapper,
    mtIframe,
    mtHeader
  }
})
