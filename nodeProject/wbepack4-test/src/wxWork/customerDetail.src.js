/*
 * @Author: waldon
 * @Date: 2020-04-09 15:21:04
 * @Last Modified by: waldon
 * @Last Modified time: 2020-06-23 15:40:50
 */

;(function () {
  let mtSlider = mtComponents.mtSlider
  let mtButton = mtComponents.mtButton
  let mtNothing = mtComponents.mtNothing
  let mtButtonWrapper = mtComponents.mtButtonWrapper
  let mtFormGap = mtComponents.mtFormGap
  let mtTag = mtComponents.mtTag
  let mtInput = mtComponents.mtInput
  let mtUploadImage = mtComponents.mtUploadImage
  let mtFold = mtComponents.mtFold
  let mtTabbar = mtComponents.mtTabbar
  new Vue({
    el: '#customerDetail',
    data() {
      return {
        isShowChild: false,
        slideList: [
          {
            name: '互动动态',
            id: 0
          },
          {
            name: '跟进记录',
            id: 1
          },
          {
            name: '客户信息',
            id: 2
          }
        ],
        sliderVal: 0,
        subList: [
          {
            key: 0,
            value: '互动行为'
          },
          {
            key: 1,
            value: '商品分析'
          }
        ],
        subVal: 0,
        //是否存在客户
        hasCustomer: false,
        hasCustomerEmpty: '',
        //外部联系人id
        externalUserId: 0,
        //客户id
        customerId: 0,
        //头部的客户信息（企微）
        headerInfo: {
          name: '',
          remark: '',
          mobile: '',
          externalHeadImg: '',
          intention: '',
          intentionName: ''
        },
        //标签列表
        tagList: [],
        clientTagList: [],
        //销售员
        tsWxWorkUserList: [],
        //群聊
        tsWxWorkGroupChatList: [],
        //客户信息
        customInfoList: [
          {
            label: '姓名',
            key: 'contacts',
            value: 'xx'
          },
          {
            label: '性别',
            key: 'sex',
            value: '女'
          },
          {
            label: '手机',
            key: 'mobile',
            value: '女'
          },
          {
            label: '类型',
            key: 'dataSourceName',
            value: '女'
          },
          {
            label: '生日',
            key: 'birthday',
            value: '女'
          },
          {
            label: '微信',
            key: 'wx',
            value: '女'
          },
          {
            label: 'QQ',
            key: 'qq',
            value: '女'
          },
          {
            label: '证件号',
            key: 'idCard',
            value: '女'
          }
        ],
        //公司信息
        companyInfoList: [
          {
            label: '行业',
            key: 'industry',
            value: ''
          },
          {
            label: '公司',
            key: 'corpName',
            value: ''
          },
          {
            label: '职位',
            key: 'position',
            value: ''
          },
          {
            label: '来源',
            key: 'source',
            value: ''
          },
          {
            label: '区域',
            key: 'province',
            value: ''
          }
        ],
        //跟进信息
        followInfoList: [
          {
            label: '跟进情况',
            key: 'followStatus',
            value: ''
          },
          {
            label: '意向度',
            key: 'intentionName',
            value: ''
          },
          {
            label: '添加时间',
            key: 'createTimeName',
            value: ''
          }
        ],
        //企微信息
        qwInfoList: [
          {
            label: '备注名',
            key: 'remark',
            value: ''
          },
          {
            label: '备注企业',
            key: 'remarkCorpName',
            value: ''
          },
          {
            label: '备注手机',
            key: 'mobiles',
            value: ''
          },
          {
            label: '备注描述',
            key: 'description',
            value: '',
            type: 'textarea'
          }
        ],
        //访客列表（同名）
        viewerList: [], //同名访客列表
        showViewerList: [], //显示的访客信息
        isShowViewList: false, //是否显示访客信息
        isInDetail: false, //是否显示访客详情
        bindViewerId: 0, //绑定的访客id
        currentViewerId: 0, //当前显示的访客id
        actionList: [], //互动行为列表
        actionParams: {
          viewerId: 0, //访客id
          id: 0, //客户id
          pageNow: 1,
          limit: 10,
          maxPage: 1
        },
        mallRelList: [], //意向商品列表
        allMallRelList: [], //所有意向商品列表
        maxCnt: 0, //商品浏览最大值
        isMoreLoading: false, //是否上拉加载
        actionEmptyTips: '', //缺省文案
        isSyncCustomerInfo: true, //是否有同步客户信息
        isCheckedApplication: true // 没勾选可调应用
      }
    },
    components: {
      mtSlider,
      mtButton,
      mtNothing,
      mtButtonWrapper,
      mtFormGap,
      mtTag,
      mtInput,
      mtUploadImage,
      mtFold,
      mtTabbar
    },
    created() {
      let corpKey = Ts_util.getUrlParam(document.URL, 'corpKey')
        ? Ts_util.getUrlParam(document.URL, 'corpKey').split('#')[0]
        : ''
      corpKey
        ? Ts_util.navigate('/wxwork/indexCenter.jsp?' + 'corpKey=' + corpKey + '#/customCenter')
        : Ts_util.navigate('/wxwork/indexCenter.jsp?')
      if (!this.isProfVer) {
        // 如果没有版本就不执行后面的逻辑
        return
      }

      Mt_Util.initWxConfig().then(() => {
        this.getCurExternalContact().then((externalUserId) => {
          // 获取userid
          this.externalUserId = externalUserId
          //头部信息用的是企微的数据，客户信息展示的是crm的数据
          this.getCustomInfo()
          this.getViewerList().then((viewerInfo) => {
            if (viewerInfo.total > 1) {
              this.checkFlag().then((flag) => {
                if (flag) {
                  this.$messagebox
                    .confirm('', {
                      title: '提醒',
                      message: '系统为您找到多个同名访客信息，请核实后进行关联',
                      confirmButtonText: '不再提醒',
                      cancelButtonText: '知道了'
                    })
                    .then(() => {})
                  this.isShowViewList = true
                  Mt_Util.post('/ajax/staff/tsStaff_h.jsp?cmd=setStaffFlag', {
                    showViewerListTip: 1
                  })
                }
              })
            }
            this.viewerList = [].concat(viewerInfo.viewerList)
            this.currentViewerId = this.viewerList[0].id
            this.showViewerList = this.viewerList
            this.bindViewerId = viewerInfo.bindViewerId
            Promise.all([this.getActionList(), this.getMallRelList()])
          })
        })
      })
    },
    watch: {
      sliderVal(newVal) {
        this.subVal = 0
        this.initData()
        switch (newVal) {
          case 0:
            this.$nextTick(() => {
              Promise.all([this.getActionList(), this.getMallRelList()])
            })
            break
          case 1:
            this.$nextTick(() => {
              this.initFollowList()
            })

            break
          case 2:
            // this.getViewerInfo()
            break
        }
      },
      $route(to, from) {
        this.isShowChild = to.path.split('/').length > 2
      }
    },
    computed: {
      /**
       * 版本权限
       * @author guoyijie
       * @date 2020-08-19
       * @returns {boolean}
       */
      isProfVer() {
        return initTsParam.isPower
      },
      hasBindViewer() {
        return this.bindViewerId !== 0
      },
      intentionClassCal() {
        if (this.headerInfo.intention === 0) {
          return ''
        } else if (this.headerInfo.intention === 1) {
          return 'high'
        } else if (this.headerInfo.intention === 2) {
          return 'medium'
        } else if (this.headerInfo.intention === 3) {
          return 'low'
        }
      },
      editIcon() {
        return `${resRoot}/image/wxwork/common/editIcon.png`
      },
      followIcon() {
        return `${resRoot}/image/wxwork/common/custom_follow.png`
      },
      infoIcon() {
        return `${resRoot}/image/wxwork/common/custom_info.png`
      },
      qiweiIcon() {
        return `${resRoot}/image/wxwork/common/custom_qiwei.png`
      },
      companyIcon() {
        return `${resRoot}/image/wxwork/common/custom_company.png`
      },

      /**
       * 是否显示缺省页
       * @author waldon
       * @date 2020/7/3
       * @returns {*}
       */
      nothingRecord() {
        if (this.sliderVal === 1) {
          this.actionEmptyTips = '暂无跟进记录'
          return !this.actionList.length
        } else {
          switch (this.subVal) {
            case 0:
              this.actionEmptyTips = 'TA还没有访问行为'
              return !this.actionList.length
            case 1:
              this.actionEmptyTips = 'TA还没访问过商品'
              return !this.allMallRelList.length
            default:
              return true
          }
        }
      },
      /**
       * 是否分销
       * @author waldon
       * @date 2020/4/10
       * @returns {boolean} 是否分销
       * */
      isOem() {
        return initTsParam.isOem
      },
      /**
       * 版本缺省提醒
       * @author waldon
       * @date 2020-06-05
       */
      emptyTips() {
        if (!this.isProfVer) {
          return '当前版本不支持该功能，请升级版本'
        } else if (!this.isCheckedApplication) {
          return '未设置可调用应用，无法正常使用，请按教程重新进行设置'
        } else if (!this.hasCustomer) {
          return this.hasCustomerEmpty
        }
      },
      showEmpty() {
        return !this.isCheckedApplication || !this.hasCustomer || !this.isProfVer
      },
      showEmptyBtn() {
        return !this.isCheckedApplication || !this.isSyncCustomerInfo || !this.isProfVer
      },
      btnText() {
        if (!this.isProfVer || !this.isCheckedApplication) {
          return '去了解'
        } else {
          return '查看教程'
        }
      },
      blogUrl() {
        if (!this.isProfVer) {
          return Mt_Util.getUrlParams().noProfVer
        } else if (!this.isSyncCustomerInfo) {
          return Mt_Util.getUrlParams().noSyncCustomerInfo
        } else if (!this.isCheckedApplication) {
          return Mt_Util.getUrlParams().noCheckApplication
        }
      }
    },
    methods: {
      checkFlag() {
        return new Promise((resolve) => {
          Mt_Util.post('/ajax/staff/tsStaff_h.jsp?cmd=checkFlag', {
            showViewerListTip: 1
          }).then((res) => {
            resolve(res.data.data.showViewerListTip)
          })
        })
      },

      initData() {
        this.actionList = []
        this.actionParams.pageNow = 1
      },
      initTagList(list) {
        this.tagList = []
        for (let item of list) {
          for (let tagItem of item.tag) {
            this.tagList.push(tagItem.name)
          }
        }
      },
      /**
       * 显示今天、昨天
       * @author waldon
       * @date 2020/7/2
       * @param {*} date -
       * @returns {*}
       */
      getDateTip(date) {
        if (Ts_util.format.addDate(new Date(), 'yyyy-MM-dd') === date) {
          return '今天'
        } else if ((Ts_util.format.addDate(new Date(), -1, 'days'), 'yyy-MM-dd') === date) {
          return '昨天'
        } else {
          return ''
        }
      },
      addFollow() {
        // this.isShowChild=true;
        this.$router.push({
          name: 'addFollow',
          query: {
            id: this.customerId
          }
        })
      },
      /**
       * 是否显示时长
       * @author waldon
       * @date 2020/7/3
       * @param {*} type -
       * @returns {*} 是否显示时长
       */
      getIsShowDuration() {
        return true
      },
      getMore() {
        this.isMore = !this.isMore
        if (this.isMore) {
          this.mallRelList = this.allMallRelList
        } else {
          this.mallRelList = this.allMallRelList.slice(0, 3)
        }
      },
      /**
       * 切换二级路由
       * @author guoyijie
       * @date 2020/8/13
       * */
      chooseSubItem(key) {
        this.subVal = key
      },
      toEdit() {
        // this.isShowChild = true;
        this.$router.push({
          name: 'editCustom',
          query: {
            externalUserId: this.externalUserId
          }
        })
      },
      /**
       * 获取客户信息
       * @author guoyijie
       * @date 2020/8/13
       * */
      getCustomInfo() {
        let params = {
          externalUserId: this.externalUserId
        }
        Mt_Util.post('/rest/manage/client/getTsClientByWxWork', params).then((res) => {
          if (res.data && res.data.success) {
            let customerData = res.data.data
            this.hasCustomer = true
            this.customerId = customerData.id
            let wxWorkRemark = customerData.wxWorkRemark
            //头部需要的信息
            if (wxWorkRemark !== undefined) {
              this.headerInfo.name = wxWorkRemark.name
              this.headerInfo.remark = wxWorkRemark.remark
              this.headerInfo.externalHeadImg = wxWorkRemark.externalHeadImg
            }
            this.headerInfo.address = customerData.address
            this.headerInfo.remark = customerData.remark
            this.headerInfo.intention = customerData.intention
            this.headerInfo.intentionName = customerData.intentionName
            this.headerInfo.mobile = customerData.mobile
            this.clientTagList = customerData.clientTagList
            this.initTagList(customerData.clientTagList)
            this.tsWxWorkUserList = [].concat(customerData.tsWxWorkUserList)
            this.tsWxWorkGroupChatList = [].concat(customerData.tsWxWorkGroupChatList)
            this.customInfoList.forEach((item) => {
              if (customerData[item.key] !== undefined) {
                item.value = customerData[item.key]
              }
            })
            this.companyInfoList.forEach((item) => {
              if (customerData[item.key] !== undefined) {
                item.value = customerData[item.key]
              }
            })
            this.followInfoList.forEach((item) => {
              if (customerData[item.key] !== undefined) {
                item.value = customerData[item.key]
              }
            })
            wxWorkRemark &&
              this.qwInfoList.forEach((item) => {
                if (wxWorkRemark[item.key] !== undefined) {
                  item.value = wxWorkRemark[item.key]
                }
              })
          } else {
            if (res.data.rt == -6 || res.data.rt == -9 || res.data.rt == -3) {
              this.hasCustomer = false
              this.hasCustomerEmpty = res.data.msg
              if (res.data.rt == -3) {
                this.isSyncCustomerInfo = false
              }
            } else {
              this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
            }
          }
        })
      },
      /**
                * 获取访客列表
            1. 同名访客为0时， 跳到缺省页
            2. 同名访客为1时， 无论是否绑定都跳到详情页 *
            3. 同名访客 > 1 时， 有绑定的跳到详情页， 未绑定的跳到访客列表页
                * @author guoyijie
                * @date 2020/8/13
                * */
      getViewerList() {
        return new Promise((resolve) => {
          let params = {
            externalUserId: this.externalUserId
          }
          Mt_Util.post('/ajax/wxWork/viewer/tsViewer_h.jsp?cmd=getViewerList', params).then(
            (res) => {
              if (res.data && res.data.success) {
                resolve(res.data.data)
              } else if (res.data && res.data.rt === -3) {
                this.isSyncCustomerInfo = false
              } else {
                this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
              }
            }
          )
        })
      },
      /**
       * 获取当前外部联系人userid
       * 从外部联系人的profile、外部聊天附件栏、聊天工具栏进入页面时才可成功调用该接口
       * @author waldon
       * @date 2020/4/10
       * */
      getCurExternalContact() {
        return new Promise((resolve) => {
          wx.invoke('getCurExternalContact', {}, (res) => {
            if (res.err_msg == 'getCurExternalContact:ok') {
              resolve(res.userId) //返回当前外部联系人userId
            } else {
              Mt_Util.getCheckInfo().then((res) => {
                if (res && res.rt === 48002) {
                  // 应用范围不可见
                  this.isCheckedApplication = false
                } else {
                  this.$messagebox({
                    // 不带corpKey的情况
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
                }
              })
            }
          })
        })
      },
      /**
       * 访客列表中绑定访客
       * @author waldon
       * @date 2020/4/10
       * @param {*} id - 访客id
       * @returns {*} 执行完成回调
       * */
      bindViewerById(id) {
        return new Promise((resolve) => {
          this.$messagebox
            .confirm('', {
              title: '确认关联',
              message: '是否对该访客进行关联?',
              confirmButtonText: '确认',
              cancelButtonText: '取消'
            })
            .then(() => {
              let params = {
                viewerId: id,
                externalUserId: this.externalUserId
              }
              Mt_Util.post('/ajax/wxWork/client/tsClient_h.jsp?cmd=bindViewer', params).then(
                (res) => {
                  if (res.data && res.data.success) {
                    this.$messagebox({
                      title: '关联成功',
                      message: '已成功关联该访客',
                      closeOnClickModal: false
                    }).then(() => {
                      this.bindViewerId = id
                      // this.relBindId = id // 更新真正的绑定id
                      if (!this.isInDetail) {
                        // 如果本身就是留在详情页面的，就不重新查询了
                        this.currentViewerId = id
                        this.initData()
                        Promise.all([this.getActionList(), this.getMallRelList()]).then((res) => {
                          // this.customerData.bindViewerId = id
                          // this.isLoaded = true
                          // if (res[0].source === 1) { // 1.通过文章访问 2.通过名片访问
                          //     this.sliderVal = 1
                          //     this.actionList = this.articleActionList
                          // } else {
                          //     this.sliderVal = 2
                          //     this.actionList = this.visitCardActionList
                          // }
                          resolve()
                        })
                      } else {
                        resolve()
                      }
                    })
                  } else {
                    this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                  }
                }
              )
            })
        })
      },
      /**
       * 解绑操作
       * @author guoyijie
       * @date 2020/8/13
       * */
      unBindViewer() {
        let params = {
          viewerId: this.bindViewerId,
          externalUserId: this.externalUserId
        }
        this.$messagebox
          .confirm('', {
            title: '取消关联',
            message: '是否取消对该访客的关联?',
            confirmButtonText: '确认取消',
            cancelButtonText: '暂不取消'
          })
          .then(() => {
            Mt_Util.post('/ajax/wxWork/client/tsClient_h.jsp?cmd=unBindViewer', params).then(
              (res) => {
                if (res.data && res.data.success) {
                  this.bindViewerId = 0 // 重置真正的绑定id
                  this.$messagebox
                    .confirm('', {
                      title: '取消关联成功',
                      message: '已为您取消关联该访客，是否需要关联其他访客?',
                      confirmButtonText: '去关联',
                      cancelButtonText: '不需要'
                    })
                    .then(() => {
                      resolve()
                    })
                    .catch(() => {
                      this.isShowViewList = true
                      // this.showViewerList = this.viewerList.find(item=>{
                      //     return item.id == this.currentViewerId;
                      // })
                      this.isInDetail = true
                    })
                } else {
                  this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                }
              }
            )
          })
      },
      /**
       * 查看下一个访客
       * 顺序循环当前同名访客列表
       * @author waldon
       * @date 2020-06-23
       */
      seeNextViewer() {
        if (this.viewerList.length) {
          // 查询当前绑定id在同名访客列表中的位置

          let currentIndex = this.viewerList.findIndex((item) => item.id == this.currentViewerId)
          currentIndex++
          if (currentIndex === this.viewerList.length) {
            // 后端默认id排序，-1代表当前绑定的为同名访客的最后一个，需要从头开始
            this.currentViewerId = this.viewerList[0].id
          } else {
            this.currentViewerId = this.viewerList[currentIndex].id
          }
          this.getViewerInfo()
        }
      },
      /**
       * 跳转到升级页
       * @author waldon
       * @date 2020-06-05
       */
      toVisitBlog() {
        if (Mt_Util.getTemp()) {
          window.open(this.blogUrl)
        } else {
          // 在默认浏览器打开redirect_uri，并附加code参数；也可以直接指定要打开的url，此时不会附带上code参数。
          wx.invoke(
            'openDefaultBrowser',
            {
              url: this.blogUrl
            },
            (res) => {
              if (res.err_msg != 'openDefaultBrowser:ok') {
                this.$messagebox('提示', res.err_msg || '网络错误')
              }
            }
          )
        }
      },
      toViewerDetail(id) {
        this.currentViewerId = id
        if (this.isInDetail) {
          return
        }
        this.isInDetail = true
        this.getViewerInfo()
      },
      getViewerInfo() {
        this.initData()
        let obj = this.viewerList.find((item) => {
          return item.id == this.currentViewerId
        })
        this.showViewerList = [].concat(obj)
        Promise.all([this.getActionList(), this.getMallRelList()]).then((res) => {})
      },
      /**
       * 下拉/上拉的最低加载动画为0.5秒
       * @author waldon
       * @date 2020/4/10
       * @returns {Promise} 返回一个计时器
       * */
      minLoadTime() {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve()
          }, 500)
        })
      },
      /**
       * 上拉加载更多。
       * 初始化时，数据不够会试图铺满屏幕而触发
       * 需等sliderVal有值后再加载，否则出现冗余数据
       * @author waldon
       * @date 2020/4/10
       * */
      loadBottom() {
        switch (this.sliderVal) {
          case 0:
            if (this.actionParams.maxPage <= this.actionParams.pageNow) {
              return
            }
            this.isMoreLoading = true
            this.actionParams.pageNow++
            Promise.all([this.getActionList(), this.minLoadTime()]).then((res) => {
              this.actionList = this.actionList.concat(res[0])
              this.isMoreLoading = false
            })
            break
          case 1:
            if (this.actionParams.maxPage <= this.actionParams.pageNow) {
              return
            }
            this.isMoreLoading = true
            this.actionParams.pageNow++
            Promise.all([this.getFollowList(), this.minLoadTime()]).then((res) => {
              // this.visitCardActionList = this.actionList.concat(res[0])
              this.actionList = this.actionList.concat(res[0])
              this.isMoreLoading = false
            })
          case 3:
        }
      },
      getActionList() {
        this.actionParams.viewerId = this.hasBindViewer ? this.bindViewerId : this.currentViewerId
        return new Promise((resolve) => {
          Mt_Util.post(
            '/ajax/wxWork/viewer/tsViewerRecord_h.jsp?cmd=getRecordList',
            this.actionParams
          ).then((res) => {
            if (res.data && res.data.success) {
              for (let key in res.data.data) {
                if (res.data.data.hasOwnProperty(key)) {
                  this.actionList.push({
                    date: key,
                    list: res.data.data[key]
                  })
                }
              }
              this.actionParams.maxPage = Math.ceil(res.data.total / this.actionParams.limit)
              resolve(this.actionList)
            } else {
              this.$messagebox('提示', res.data.msg || '获取互动行为列表失败')
            }
          })
        })
      },
      getMallRelList() {
        return new Promise((resolve) => {
          Mt_Util.post('/ajax/wxWork/viewer/tsViewer_h.jsp?cmd=getViewerMallRelList', {
            viewerId: this.currentViewerId,
            pageNow: 1,
            limit: 10
          }).then((res) => {
            if (res.data && res.data.success) {
              this.allMallRelList = res.data.data
              this.maxCnt = this.allMallRelList.length > 0 ? this.allMallRelList[0].visitCnt : 0
              this.mallRelList = this.allMallRelList.slice(0, 3)
              resolve(this.mallRelList)
            } else {
              this.$messagebox('提示', res.data.msg || '获取意向商品列表失败')
            }
          })
        })
      },
      initFollowList() {
        this.getFollowList().then((list) => {
          this.actionList = [].concat(list)
        })
      },
      getFollowList() {
        this.actionParams.id = this.customerId
        let parmes = Object.assign({}, this.actionParams, {
          type: -1
        })
        return new Promise((resolve) => {
          Mt_Util.post('/ajax/client/tsClientVisits_h.jsp?cmd=getTsClientVisitsList', parmes).then(
            (res) => {
              if (res.data && res.data.success) {
                res.data.data.forEach((item) => {
                  item.date = Ts_util.format.date(new Date(item.date), 'yyyy-MM-dd')
                  if (item.list && item.list.length > 0) {
                    item.list.forEach((subItem) => {
                      subItem.createTimeName = subItem.createTime
                        ? Ts_util.format.date(new Date(subItem.createTime), 'HH:mm')
                        : ''
                      subItem.visitTimeName = subItem.visitsTime
                        ? Ts_util.format.date(new Date(subItem.visitsTime), 'yyyy-MM-dd HH:mm')
                        : ''
                    })
                  }
                })
                this.actionParams.maxPage = Math.ceil(res.data.total / this.actionParams.limit)
                resolve(res.data.data)
              } else {
                this.$messagebox('提示', res.data.msg || '获取互动行为列表失败')
              }
            }
          )
        })
      },
      toAddTag() {
        // this.isShowChild = true;
        this.$router.push({
          name: 'addTag',
          query: {
            tagList: this.clientTagList,
            id: this.customerId
          }
        })
      }
    }
  })
})()
