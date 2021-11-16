new Vue({
  el: '#workLogin',
  data: {
    loginInfo: {
      cacct: '', // 企业账号
      sacct: '', // 成员账号
      pwd: '', // 密码
      validateCode: '' // 图形验证码
    },
    currActive: '', // 当前聚焦的input框
    bindingIcon: '', // 输入框绑定的icon
    bottomActive: '', // 聚焦时显示的底部line颜色
    isShowValidateCode: false, // 根据后端返回值判断是否显示验证码
    validateImgSrc: '' // 图形验证码地址
  },
  watch: {},
  computed: {
    /**
     * 根据所有输入框“空”和“非空”的状态显示不同颜色登录按钮
     * @author waldon
     * @date 2020/4/10
     * @returns {string} 根据所有输入框状态返回class的值
     * */
    loginActiveBtn() {
      let flag = true
      let loginInfoArr = Object.keys(this.loginInfo)
      loginInfoArr.forEach((item) => {
        // 当需求显示图形验证码，并且验证码有值时，校验才通过
        if (!this.loginInfo[item] && !(!this.isShowValidateCode && item === 'validateCode')) {
          flag = false
        }
      })
      return flag ? 'loginActiveBtn' : ''
    },
    /**
     * 直分销标题
     * @author waldon
     * @date 2020/4/10
     * @returns {string} 直分销标题
     * */
    loginTitle() {
      return initTsParam.isOem ? '销售系统' : '凡科易销'
    }
  },
  methods: {
    /**
     * 输入框聚焦时的变化颜色和Icon
     * @author waldon
     * @date 2020/4/10
     * @param {string} type - 在聚焦的的输入框标识
     * */
    focusLoginInput(type) {
      this.currActive = type
      this.bottomActive = 'bottomActive'
      switch (type) {
        case 'cacct':
          this.bindingIcon = 'cacctIcon_active'
          break
        case 'sacct':
          this.bindingIcon = 'sacctIcon_active'
          break
        case 'pwd':
          this.bindingIcon = 'pwdIcon_active'
          break
        case 'validate':
      }
    },
    /**
     * 登录方法
     * @author waldon
     * @date 2020/4/10
     * */
    wxWorkLogin() {
      if (!this.loginInfo.cacct) {
        this.$messagebox('提示', '请输入企业帐号')
        return
      }
      if (!this.loginInfo.sacct) {
        this.$messagebox('提示', '请输入成员帐号')
        return
      }
      if (!this.loginInfo.pwd) {
        this.$messagebox('提示', '请输入密码')
        return
      }
      if (this.isShowValidateCode && !this.loginInfo.validateCode) {
        this.$messagebox('提示', '请输入验证码')
        return
      }
      let params = Object.assign({}, this.loginInfo)
      params.pwd = Ts_util.md5(this.loginInfo.pwd)
      params.ts_hideLoading = true
      Mt_Util.post('/ajax/workLogin_h.jsp?cmd=login', params).then((res) => {
        if (res.data) {
          if (res.data.success) {
            let pathStatus = Ts_util.getUrlParam(document.URL, 'pathStatus')
            let corpKey = Ts_util.getUrlParam(document.URL, 'corpKey')
            Ts_util.navigate(
              '/wxwork/bindWxWork.jsp?pathStatus=' + pathStatus + '&corpKey=' + corpKey
            )
          } else {
            if (res.data.data) {
              const data = res.data.data
              if (data.needValidateCode) {
                this.getValidateCode()
                this.isShowValidateCode = true
              }
            }
            this.$messagebox('提示', res.data.msg || '登录失败，请稍后重试')
          }
        } else {
          this.$messagebox('提示', '登录失败，请稍后重试')
        }
      })
    },
    /**
     * 获取验证码
     * @author waldon
     * @date 2020/4/10
     * */
    getValidateCode() {
      this.validateImgSrc = '/validateCode.jsp?' + Math.random() + '&validateCodeRegType=3'
    },
    /**
     * 节点渲染完后，预加载active的icon
     * @author waldon
     * @date 2020/4/10
     * */
    preloadIcon() {
      let hiddenArea = document.getElementById('hiddenArea')
      let childNode = document.createElement('div')
      childNode.setAttribute('class', 'iconLeft')
      let classList = ['cacctIcon_active', 'sacctIcon_active', 'pwdIcon_active']
      classList.forEach((item) => {
        let cloneNode = childNode.cloneNode()
        cloneNode.setAttribute('class', item)
        hiddenArea.appendChild(cloneNode)
      })
    }
  },
  mounted() {
    this.preloadIcon()
    let result = Ts_util.getUrlParam(document.URL, 'result')
    if (result) {
      result = JSON.parse(result)
      console.log(result.rt)
      switch (result.rt) {
        case 1: // rt为1就是缺少corpKey
          this.$messagebox({
            title: '功能更新提醒',
            message: '已上线企微聊天工具栏自动登录功能请重新配置聊天工具栏后生效',
            confirmButtonText: '查看教程'
          }).then(() => {
            if (typeof initTsParam !== 'undefined' && !initTsParam.isOem) {
              window.open('https://yx.fkw.com/blog/20817')
            } else {
              window.open('https://docs.qq.com/doc/DYVhnSEpuUHFKZ0dS')
            }
          })
          break
        case 50001: // rt为5001就是可信域名未登记
          this.$messagebox({
            title: '提示',
            message: '未设置内部应用安全域名，无法正常使用，请按照设置教程重新进行设置',
            confirmButtonText: '查看教程'
          }).then(() => {
            if (typeof initTsParam !== 'undefined' && !initTsParam.isOem) {
              window.open('https://yx.fkw.com/blog/20810')
            } else {
              window.open('https://docs.qq.com/doc/DYXdNZnRNc0R2R1lC')
            }
          })
          break
        // 下面的这些rt不做任何提示
        case -3:
          break
        default:
          this.$messagebox('提示', result.msg || '登录失败，请稍后重试')
      }
    }
  }
})
