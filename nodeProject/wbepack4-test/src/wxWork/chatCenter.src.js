;(function () {
  let mtSlider = mtComponents.mtSlider
  let mtInput = mtComponents.mtInput
  let mtButton = mtComponents.mtButton
  let mtCollapseItem = mtComponents.mtCollapseItem
  let mtBottomLine = mtComponents.mtBottomLine
  let mtStTip = mtComponents.mtStTip
  let mtNothing = mtComponents.mtNothing
  let mtSearch = mtComponents.mtSearch
  let mtTabbar = mtComponents.mtTabbar
  Mt_Util.router.chatCenter = Vue.extend({
    name: 'chatCenter',
    template: `
            <div class="chatCenter">
                <div class="chatCenterWrapper" :class="[topCloss, padClass]" v-if="isProfVer">
                    <div class="topWrapper" :class="topCloss">
                        <mt-st-tip :tip-class="'topCloseTips '+ isShowCloseTips" color="yellow" v-if="!checkStatus.gfwCheck">
                            <p class="shutDownTips">
                                {{checkStatus.msg}}
                                <span class="needBlog" @click="seeArticleNow" v-if="checkStatus.needBlog">查看详情</span>
                            </p>
                            <p class="shutDownReason">{{checkStatus.msg2}}</p>
                        </mt-st-tip>
                        <mt-slider
                            slider-type="navTop"
                            :slider-val.sync="navSliderVal"
                            :slider-array="navSliderArray">
                        </mt-slider>
                        <mt-slider
                            v-if="navSliderVal == 1"
                            :slider-val.sync="normalSliderVal"
                            :slider-array="normalSliderArray">
                        </mt-slider>
                        <mt-search
                            v-show="pageStatus !== 'result'"
                            ref="searchBox"
                            :limitSpace="true"
                            :maxlength="30"
                            :searchOnInput="true"
                            :showCancelBtn="pageStatus == 'search'"
                            @cancel="cancelSearch"
                            @search="getMaterialListByName"
                        ></mt-search>
                        <mt-slider
                            v-if="navSliderVal == 5 && pageStatus == 'normal'"
                            :slider-val.sync="normalSliderVal"
                            :slider-array="normalSliderArray">
                        </mt-slider>
                    </div>
                    <div class="chatContent" v-if="groupTagList.length > 0 && checkStatus.gfwCheck && navSliderVal == 1">
                        <p v-if="groupTagParentList.length === 0" class="nothingTip">没有找到{{navSliderVal == 1 ? '相关话术' : '相关文件'}}</p>
                        <mt-collapse-item
                            v-else
                            :row-name="item.name"
                            v-for="item of groupTagParentList"
                            :key="item.id"
                            :is-open.sync="item.isOpen"
                            @toggle-col="getMaterialByGroup($event, item.id)">
                            <p v-if="item.materialList.length === 0 && item.childGroupList.length == 0" class="nothingTip">暂无数据</p>
                            <div v-else class="contentBox">
                                <ul v-if="navSliderVal === 2" class="contentWrapper imgWrapper">
                                    <li class="imgBox"
                                        @click="sendMessage(subItem, item.id)"
                                        v-for="subItem of item.materialList"
                                        :key="subItem.id">
                                        <div class="imgFakerBox">
                                            <div class="grayMask" v-if="checkSize(subItem)"></div>
                                            <img class="materialImg" :src="getMiniImgUrl(subItem.content)" alt="">
                                        </div>
                                        <div class="nameBox">
                                            <p class="imgName">{{subItem.name}}</p>
                                        </div>
                                    </li>
                                </ul>
                                <ul v-else class="contentWrapper">
                                    <li class="contentTextBox"
                                        @click="sendMessage(subItem, item.id)"
                                        v-for="subItem of item.materialList"
                                        :key="subItem.id">
                                        <img v-if="navSliderVal === 1" class="colImg" :src="chatIcon" alt="">
                                        <img v-else class="colImg" :src="getFileIcon(subItem)" alt="">
                                        <p v-if="navSliderVal === 1" class="colText" v-html="subItem.showText"></p>
                                        <p v-else class="colText">{{subItem.name}}</p>
                                        <div class="grayMask" v-if="checkSize(subItem)"></div>
                                    </li>
                                </ul>
                                <mt-collapse-item
                                    v-if="item.childGroupList.length > 0"
                                    v-for="childGroup of item.childGroupList"
                                    :key="childGroup.id"
                                    :row-name="childGroup.name"
                                    :is-open.sync="childGroup.isOpen"
                                    class="childCollapse"
                                    @toggle-col="getMaterialByGroup($event, childGroup.id)"
                                >
                                    <p v-if="childGroup.materialList.length === 0" class="nothingTip">暂无数据</p>
                                    <div v-else class="contentBox">
                                        <ul v-if="navSliderVal === 2" class="contentWrapper imgWrapper">
                                            <li class="imgBox"
                                                @click="sendMessage(subChildItem, item.id)"
                                                v-for="subChildItem of childGroup.materialList"
                                                :key="subChildItem.id">
                                                <div class="imgFakerBox">
                                                    <div class="grayMask" v-if="checkSize(subChildItem)"></div>
                                                    <img class="materialImg" :src="getMiniImgUrl(subChildItem.content)" alt="">
                                                </div>
                                                <div class="nameBox">
                                                    <p class="imgName">{{subChildItem.name}}</p>
                                                </div>
                                            </li>
                                        </ul>
                                        <ul v-else class="contentWrapper">
                                            <li class="contentTextBox childCollapse"
                                                @click="sendMessage(subChildItem, item.id)"
                                                v-for="subChildItem of childGroup.materialList"
                                                :key="subChildItem.id">
                                                <img v-if="navSliderVal === 1" class="colImg" :src="chatIcon" alt="">
                                                <img v-else class="colImg" :src="getFileIcon(subChildItem)" alt="">
                                                <p v-if="navSliderVal === 1" class="colText" v-html="subChildItem.showText"></p>
                                                <p v-else class="colText">{{subChildItem.name}}</p>
                                                <div class="grayMask" v-if="checkSize(subChildItem)"></div>
                                            </li>
                                        </ul>
                                    </div>
                                </mt-collapse-item>
                            </div>
                        </mt-collapse-item>
                    </div>
                    <mt-loadmore v-else-if="checkStatus.gfwCheck && navSliderVal == 5" v-infinite-scroll="loadBottom" ref="loadmore">
                        <div class="fileListBox" >
                            <div class="breadCrumbBox" v-if="filePath.length > 1">
                                <span :class="[{highlight: index == filePath.length - 1}]" v-for="(item,index) in filePath" @click="gotoFilePath(item, index)">
                                    {{item.name}}{{index < filePath.length - 1 ? '/' : ''}}
                                </span>
                            </div>
                            <div class="fileBox">
                                <div v-for="(item, index) in fileList" class="itemBox flex flex-vc" @click="operateFile(item, index)" v-if="fileList.length">
                                    <div class="grayMask" v-if="!item.isDir && checkSize(item)"></div>
                                    <img class="imgBox" :src="getFileIcon(item)" alt=""/>
                                    <div class="infoBox">
                                        <div class="name" v-if="pageStatus == 'search'" v-html="getHighName(item.name)"></div>
                                        <div class="name" v-else>{{item.name}}</div>
                                        <div class="info">
                                            <span>{{item.createTimeName}}</span><span class="line"></span><span>{{item.sizeName}}{{item.isDir ? '个文件' : ''}}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <mt-nothing :noPadding="true" v-if="!fileList.length" emptyTips="暂无文件"></mt-nothing>
                        </div>
                    </mt-loadmore>
                    <div class="showNoneArea" v-else-if="!checkStatus.gfwCheck">
                        <img class="imgBoxNoData" :src="pageError">
                        <div class="showNoneText">
                            页面已关闭，请联系管理员
                        </div>
                    </div>
                    <mt-nothing :noPadding="true" v-else emptyTips="暂无相关素材"></mt-nothing>
                </div>
                <mt-nothing v-else :emptyTips="explain">
                    <div class="operateBox">
                        <mt-button size="small" type="mainColor" @click="toVisitBlog">{{btnText}}</mt-button>
                    </div>
                </mt-nothing>  
            </div>
        `,
    components: {
      mtSlider,
      mtInput,
      mtButton,
      mtCollapseItem,
      mtBottomLine,
      mtStTip,
      mtNothing,
      mtSearch,
      mtTabbar
    },
    data() {
      return {
        navSliderVal: 1,
        navSliderArray: [
          {
            id: 1,
            name: '话术库'
          },
          {
            id: 5,
            name: '文件夹'
          }
          // {
          //     id: 2,
          //     name: '图片库'
          // },
          // {
          //     id: 3,
          //     name: '文件库'
          // }
        ],
        normalSliderVal: 1,
        normalSliderArray: [
          {
            id: 1,
            name: '企业话术'
          },
          {
            id: 2,
            name: '我的话术'
          }
        ],
        groupTagList: [], // 分组列表
        groupTagParentList: [], // 一级分组列表
        groupTagSearchList: [], // 分组搜索列表
        currentMaterialList: [], // 当前打开的素材列表
        currentMaterialChildList: [], // 当前打开的素材子列表
        groupId: '', // 当前分组的id
        IMG_SIZE: '!160x160', // 略缩图格式，接口不返回，直接在前端拼
        checkStatus: {
          gfwCheck: true, // false则显示审查信息
          msg: '',
          msg2: '',
          blogUrl: '',
          needBlog: false
        },
        /* 文件列表相关数据 start */
        fileList: [], // 文件/文件夹列表
        filePath: [], // 文件导航面包屑路径
        fileSlideVal: 1, // 文件夹选中分类
        fileSliderArray: [
          {
            // 文件夹分类列表
            id: 1,
            name: '企业文件'
          },
          {
            id: 2,
            name: '我的话术'
          }
        ],
        fileRequestParam: {
          // 文件夹页请求数据
          typeGroup: 12, // 分组类型 企业文件12 ；个人文件13 搜索的时候传空字符串
          groupId: '', // 文件夹id，搜索时传-1
          name: '', // 根据名称查询
          from: 2, // 企微调用时传2
          category: 0, // 1：文档，2：图片，3：视频, 4：文件夹
          search: false // 搜索的时候传true
        },
        pageStatus: 'normal', // 文件夹页面状态 normal:正常文件夹 search:搜索页 result:搜索结果页
        isSearchStatus: false, // 当前是否处于搜索状态
        fileSearchName: '', // 存储搜索内容
        otherCheckOption: {
          // 分页加载
          pageNow: 1,
          limit: 10,
          maxPage: 2
        }
        /* 文件列表相关数据 start */
        // isOem: initTsParam.isOem // 直分销判断 true: 分销
      }
    },
    watch: {
      /**
       * 个人、企业滑块
       * @author waldon
       * @date 2020/4/10
       * @param {*} newVal - 滑块值
       */
      navSliderVal(newVal) {
        if (newVal === 3) {
          this.normalSliderVal = 1
          this.normalSliderArray = [
            {
              id: 1,
              name: '企业'
            }
          ]
        } else if (newVal === 1) {
          this.normalSliderVal = 1
          this.normalSliderArray = [
            {
              id: 1,
              name: '企业话术'
            },
            {
              id: 2,
              name: '我的话术'
            }
          ]
        } else if (newVal === 5) {
          this.normalSliderVal = 1
          this.normalSliderArray = [
            {
              id: 1,
              name: '企业文件'
            },
            {
              id: 2,
              name: '我的文件'
            }
          ]
          console.log(initTsParam.isAllowShowProductMaterial, '是否显示产品文件夹')
          if (initTsParam.isAllowShowProductMaterial) {
            this.normalSliderArray.unshift({
              id: 3,
              name: '产品文件'
            })
            this.normalSliderVal = 3
          }
        } else {
          this.normalSliderArray = [
            {
              id: 1,
              name: '企业'
            },
            {
              id: 2,
              name: '个人'
            }
          ]
        }
      },
      /**
       * 分类改变时重查数据
       * @author waldon
       * @date 2020/4/10
       * @param {*} newVal -
       */
      groupTypeCal(newVal) {
        if ([12, 13, 18].includes(newVal)) {
          // 切换分类
          console.log('查找文件夹数据')
          this.otherCheckOption.pageNow = 1
          this.fileRequestParam.groupId = ''
          this.getFileList().then((data) => {
            this.fileList = data
            this.filePath = []
          })
        } else {
          this.getGroupTagList()
          this.getCommonMaterialList()
        }
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
      btnText() {
        return '去了解'
      },
      blogUrl() {
        return Mt_Util.getUrlParams().noProfVer
      },
      /**
       * 版本缺省提醒
       * @author waldon
       * @date 2020-06-05
       */
      explain() {
        return '当前版本不支持该功能，请升级版本'
      },
      /**
       * 审查样式
       * @author waldon
       * @date 2020/5/27
       * @returns {*}
       */
      topCloss() {
        return this.checkStatus.gfwCheck ? '' : 'isShowClose'
      },
      padClass() {
        if (this.pageStatus == 'normal') return
        else if (this.pageStatus == 'search') return 'searchPadClass'
        else return 'resultPadClass'
      },
      /**
       * 审查样式
       * @author waldon
       * @date 2020/5/27
       * @returns {*}
       */
      isShowCloseTips() {
        return !this.checkStatus.gfwCheck ? 'showToptips' : ''
      },
      /**
       * 分为个人和企业，对应不同页面
       * 1.企业话术 2.企业图片 3.企业文件 5.个人话术 6.个人图片 12.企业文件 13.我的文件
       * @author waldon
       * @date 2020/4/10
       * @returns {number} 不同页签对应的groupType
       * */
      groupTypeCal() {
        if (this.navSliderVal == 1) {
          // 话术库
          if (this.normalSliderVal === 1) {
            // 企业
            return this.navSliderVal
          } else {
            return this.navSliderVal + this.normalSliderVal + 2
          }
        } else {
          // 企业文件夹
          switch (this.normalSliderVal) {
            case 1:
              return 12
            case 2:
              return 13
            case 3:
              return 18
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
      searchIcon() {
        return `${resRoot}/image/wxwork/common/search.png`
      },
      chatIcon() {
        // return `${resRoot}/image/wxwork/material/icon_chat${this.isOem ? '_oem' : ''}.png`
        return `${resRoot}/image/wxwork/material/icon_chat.png`
      },
      pageError() {
        // return this.isOem ? `${resRoot}/image/wxwork/notDirectSale/pageError.png` : `${resRoot}/image/wxwork/directSale/pageError.png`;
        return `${resRoot}/image/wxwork/directSale/pageError.png`
      },
      noData() {
        // return this.isOem ? `${resRoot}/image/wxwork/notDirectSale/noData.png` : `${resRoot}/image/wxwork/directSale/noData.png`;
        return `${resRoot}/image/wxwork/directSale/noData.png`
      }
    },
    methods: {
      seeArticleNow() {
        let flag = false
        if (navigator) {
          const devices = ['Android', 'iPhone']
          for (let item of devices) {
            if (navigator.userAgent.includes(item)) {
              flag = true
            }
          }
        }
        if (flag) {
          // 移动端直接打开就行，会默认使用自带的浏览器
          window.open(this.checkStatus.blogUrl)
        } else {
          // pc
          // 在默认浏览器打开redirect_uri，并附加code参数；也可以直接指定要打开的url，此时不会附带上code参数。
          wx.invoke(
            'openDefaultBrowser',
            {
              url: this.checkStatus.blogUrlPc
            },
            (res) => {
              if (res.err_msg != 'openDefaultBrowser:ok') {
                this.$messagebox('提示', res.err_msg || '网络错误')
              }
            }
          )
        }
      },
      /**
       * 根据文件名判断文件类型获取icon
       * @author waldon
       * @date 2020/4/10
       * @param {*} fileName - 文件名
       * @returns {*} 文件图标
       */
      getFileIcon(item) {
        let fileName = item.name
        let category = item.category
        // 所有文件
        if (fileName && fileName.includes('.')) {
          let fileNames = fileName.split('.')
          let fileType = fileNames[fileNames.length - 1]
          switch (fileType) {
            case 'doc':
            case 'docx':
              return resRoot + '/image/wxwork/material/icon_word.png'
            case 'xls':
            case 'xlsx':
              return resRoot + '/image/wxwork/material/icon_excel.png'
            case 'pdf':
              return resRoot + '/image/wxwork/material/icon_pdf.png'
            case 'ppt':
            case 'pptx':
            case 'pps':
            case 'ppsx':
              return resRoot + '/image/wxwork/material/icon_ppt.png'
            case 'jpg':
            case 'jpeg':
            case 'png':
              return item.content
            case 'mp4':
            case 'MP4':
              return item.coverImgUrl
          }
        }
        if (category == 2) {
          // 图片，为了兼容有些图片的命名没有后缀
          return item.content
        }
        if (category == 3) {
          // 视频，为了兼容有些视频的命名没有后缀
          return item.coverImgUrl
        }
        return resRoot + '/image/wxwork/material/icon_file.png'
      },
      /**
       * 从素材库发送消息
       * @author waldon
       * @date 2020/4/10
       * @param {Object} rowData - 当前行的数据
       * @param {Number} parentId - 话术最外层父分组id
       * */
      sendMessage(rowData, parentId) {
        console.log('sendMessage', rowData)
        let size = rowData.size / 1024 / 1024
        let params = {}
        if (this.groupTypeCal === 1 || this.groupTypeCal === 5) {
          // 话术
          params = {
            msgtype: 'text',
            text: {
              content: rowData.content // 文本内容
            }
          }
          if (parentId == -1) {
            // 常用分组下的话术
            Mt_Util.FdpLog('yx_cblkjhf_cyfzsy') // 常用分组使用
          }
          this.sendChatMessage(params)
          this.getMediaId(rowData) // 话术也需要调这个接口来统计使用次数
          Mt_Util.FdpLog('yx_fxwj', {
            yx_staff_position: initTsParam.isUpperAdm ? 1 : 2, // 员工职务 1-管理员 2-销售员 4-未知
            yx_free_text_0: '话术'
          })
        } else {
          // 查询临时素材
          let eventName = ''
          if (this.checkSize(rowData)) {
            let category = rowData.category // 文件类型 1：文档 2：图片 3：视频
            let fileName = ''
            switch (category) {
              case 1:
                fileName = '文档'
                break
              case 2:
                fileName = '图片'
                break
              case 3:
                fileName = '视频'
                break
            }
            this.$messagebox('提示', '该' + fileName + '超出企业微信官方限制，暂时无法发送给客户')
            return
          }
          this.getMediaId(rowData).then((mediaId) => {
            if (rowData.category == 2) {
              // 图片
              params = {
                msgtype: 'image', // 消息类型，必填
                image: {
                  mediaid: mediaId // 图片的素材id
                }
              }
              eventName = '图片'
            }
            if (rowData.category == 1) {
              // 文件

              params = {
                msgtype: 'file', // 消息类型，必填
                file: {
                  mediaid: mediaId // 文件的素材id
                }
              }
              eventName = '文档'
            }
            if (rowData.category == 3) {
              // 视频

              params = {
                msgtype: 'video', // 消息类型，必填
                video: {
                  mediaid: mediaId // 文件的素材id
                }
              }
              eventName = '视频'
            }
            eventName = '文档'
            console.log(params, '视频数据')
            this.sendChatMessage(params)
            Mt_Util.FdpLog('yx_fxwj', {
              yx_staff_position: initTsParam.isUpperAdm ? 1 : 2, // 员工职务 1-管理员 2-销售员 4-未知
              yx_free_text_0: eventName
            })
          })
        }
      },
      /**
       * 查询临时素材
       * @author waldon
       * @date 2020/4/10
       * @param {Object} rowData - 当前行的数据
       * */
      getMediaId(rowData) {
        let params = {
          id: rowData.id // 素材id
        }
        let url = '/ajax/wxWork/material/tsMaterial_h.jsp?cmd=getMediaId'
        if (rowData.isProductMaterial) {
          url = '/rest/manage/material/getMediaIdByProductMaterial'
        }
        return new Promise((resolve) => {
          Mt_Util.post(url, params).then((res) => {
            if (res.data && res.data.success) {
              console.log(res.data, 'data???')
              if (rowData.isProductMaterial) resolve(res.data.msg)
              else resolve(res.data.data)
            } else if (res.data && res.data.rt !== 6040) {
              this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
            }
          })
        })
      },
      /**
       * 通过聊天工具栏向当前会话发送消息
       * 此接口支持多种消息格式，包括文本(“text”)，图片(“image”)，视频(“video”)，文件(“file”)以及H5(“news”）
       * @author waldon
       * @date 2020/4/10
       * @param {Object} msgData - 发送的消息类型和数据
       * */
      sendChatMessage(msgData) {
        wx.invoke('sendChatMessage', msgData, (wxRes) => {
          console.log(wxRes, '发送是否成功的数据')
          if (wxRes.err_msg == 'sendChatMessage:ok') {
            console.log(`发送成功`)
          } else {
            Mt_Util.getCheckInfo().then((res) => {
              if (res && res.rt === 48002) {
                // 应用范围不可见
                this.$messagebox({
                  title: '提示',
                  message: '未设置可调用应用，无法正常使用，请按教程重新进行设置',
                  confirmButtonText: '查看教程'
                }).then(() => {
                  if (Mt_Util.getTemp()) {
                    window.open(Mt_Util.getUrlParams().noCheckApplication)
                  } else {
                    // 在默认浏览器打开redirect_uri，并附加code参数；也可以直接指定要打开的url，此时不会附带上code参数。
                    wx.invoke(
                      'openDefaultBrowser',
                      {
                        url: Mt_Util.getUrlParams().noCheckApplication
                      },
                      (res) => {
                        if (res.err_msg != 'openDefaultBrowser:ok') {
                          this.$messagebox('提示', res.err_msg || '网络错误')
                        }
                      }
                    )
                  }
                })
              } else {
                this.$messagebox(
                  '提示',
                  '已上线企微聊天工具栏自动登录功能请重新配置聊天工具栏后生效'
                )
              }
            })
          }
        })
      },
      /**
       * 判断返回分组列表还是常用列表
       * @author waldon
       * @date 2020/4/10
       * @param {Object} groupData - 分组数据
       * @param {Boolean} isChildGroup - 是否二级分组
       * */
      getCurrentMaterialList(groupData, isChildGroup) {
        if (groupData.list && groupData.list.length > 0) {
          return groupData.list
        } else {
          return this[isChildGroup ? 'currentMaterialChildList' : 'currentMaterialList']
        }
      },
      /**
       * 按名称查询搜索结果
       * @author waldon
       * @date 2020/4/10
       */
      getMaterialListByName(searchName) {
        if (this.navSliderVal == 1) {
          // 话术搜索
          if (!searchName) {
            this.getGroupTagList()
            this.getCommonMaterialList()
            return
          }
          let params = {
            typeGroup: this.groupTypeCal,
            name: searchName
          }
          Mt_Util.post(
            '/ajax/wxWork/material/tsMaterial_h.jsp?cmd=getGroupMaterialList',
            params
          ).then((res) => {
            if (res.data && res.data.success) {
              let tempList = JSON.parse(JSON.stringify(this.groupTagSearchList))
              tempList.forEach((item) => {
                item.isOpen = true
              })

              console.log(tempList, 'item')
              res.data.data.forEach((item) => {
                // 遍历分配话术到对应分组
                console.log(item, 'item')
                let groupInfo = tempList.filter((groupItem) => groupItem.id == item.groupId)[0]
                console.log(groupInfo, 'groupInfo')
                if (this.navSliderVal == 1) {
                  // 话术搜索对应的字符高亮
                  item.showText = Ts_util.encodeHtml(item.content) // 不能直接改content这个字段，因为最后是要用这个字段来发送话术
                  item.showText = item.showText.replace(
                    new RegExp(searchName, 'g'),
                    `<span class="keyword">${searchName}</span>`
                  )
                }
                groupInfo.materialList.push(item)
              })

              let hasMaterialList = tempList.filter(
                (item) =>
                  item.materialList.length > 0 ||
                  tempList
                    .filter((subItem) => item.id != 0 && subItem.parentId == item.id)
                    .filter((childItem) => childItem.materialList.length > 0).length > 0
              )
              let groupTagParentList = hasMaterialList.filter((item) => item.parentId == 0) // 筛选出所有一级分组
              groupTagParentList.forEach((parent) => {
                parent.childGroupList =
                  parent.id == 0
                    ? []
                    : hasMaterialList.filter((child) => child.parentId == parent.id) // 将所有二级分组归类到对应的一级分组
              })
              this.groupTagParentList = groupTagParentList
            } else if (res.data && res.data.rt !== 6040) {
              this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
            }
          })
        } else {
          console.log(searchName, '搜索内容')
          if (searchName) {
            // 有搜索内容时进入搜索状态
            this.fileRequestParam.groupId = -1 // 搜索时传-1
            this.fileRequestParam.name = searchName
            this.fileRequestParam.search = true
            this.fileSearchName = searchName // 存储搜索内容
            this.pageStatus = 'search'
          } else {
            // 无搜索内容时回归默认状态
            this.fileRequestParam.groupId = ''
            this.fileRequestParam.name = ''
            this.fileRequestParam.search = false
            this.fileSearchName = ''
            this.pageStatus = 'normal'
          }
          this.filePath = [] // 清空面包屑导航
          console.log('搜索呀')
          this.otherCheckOption.pageNow = 1
          this.getFileList().then((data) => {
            this.fileList = data
            // this.fileList.forEach(item => { // 遍历分配话术到对应分组
            //     console.log(groupInfo, 'groupInfo')
            //         // name = item.showText.replace(new RegExp(Ts_util.encodeHtml(searchName), 'g'), `<span class="keyword">${Ts_util.encodeHtml(searchName)}</span>`);

            // });
          })
        }
      },
      /**
       * 搜索状态时高亮搜索文案
       * @author lymn
       * @date 2020-11-23
       * @param {Boolean} param
       */
      getHighName(name) {
        if (this.fileSearchName && this.fileSearchName.length > 0) {
          // 匹配关键字正则
          let replaceReg = new RegExp(Ts_util.encodeHtml(this.fileSearchName), 'g')
          // 高亮替换v-html值
          let replaceString =
            '<span class="keyword">' + Ts_util.encodeHtml(this.fileSearchName) + '</span>'
          // 开始替换
          name = Ts_util.encodeHtml(name).replace(replaceReg, replaceString)
        }
        return name
      },
      /**
       * 拼接图片地址略缩图
       * @author waldon
       * @date 2020/4/10
       * */
      getMiniImgUrl(url) {
        if (url && url.includes('.')) {
          return url
            .split('.')
            .map((item, index) => {
              if (index === 0) {
                return item
              }
              if (index === url.split('.').length - 1) {
                return this.IMG_SIZE + '.' + item
              } else {
                return '.' + item
              }
            })
            .join('')
        }
        return ''
      },
      /**
       * 获取当前页签对应的分组列表
       * @author waldon
       * @date 2020/4/10
       * @Last Modified by: turbo
       * @Last Modified time: 2020-10-26
       * */
      getGroupTagList() {
        this.$refs.searchBox && this.$refs.searchBox.clear() // 切换企业/个人时清空搜索框内容
        let params = {
          type: this.groupTypeCal
        }
        Mt_Util.post('/ajax/comm/tsGroup_h.jsp?cmd=getTsGroupList', params).then((res) => {
          if (res.data && res.data.success) {
            res.data.data.unshift({
              id: -1,
              name: '常用',
              parentId: 0
            })
            res.data.data.push({
              id: 0,
              name: '未分组',
              parentId: 0
            })
            res.data.data.forEach((item) => {
              item.isOpen = item.id == -1
              item.materialList = [] // 该分组下的话术列表
            })
            let groupTagParentList = res.data.data.filter((item) => item.parentId == 0) // 筛选出所有一级分组
            groupTagParentList.forEach((parent) => {
              parent.childGroupList =
                parent.id == 0 ? [] : res.data.data.filter((child) => child.parentId == parent.id) // 将所有二级分组归类到对应的一级分组
            })
            this.groupTagList = res.data.data
            this.groupTagParentList = groupTagParentList
            this.groupTagSearchList = JSON.parse(JSON.stringify(res.data.data)) // 深拷贝
          } else if (res.data && res.data.rt !== 6040) {
            this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
          }
        })
      },
      /**
       * 获取常用的素材
       * @author waldon
       * @date 2020/4/10
       * */
      getCommonMaterialList() {
        this.currentMaterialList = []
        let params = {
          typeGroup: this.groupTypeCal
        }
        Mt_Util.post(
          '/ajax/wxWork/material/tsMaterial_h.jsp?cmd=getCommonMaterialList',
          params
        ).then((res) => {
          if (res.data && res.data.success) {
            // this.currentMaterialList = res.data.data
            this.setMaterialListByGroupId(-1, res.data.data)
          } else if (res.data && res.data.rt !== 6040) {
            this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
          }
        })
      },
      /**
       * 根据分组查询素材
       * @author waldon
       * @date 2020/4/10
       * @param {*} isOpen - 是否开启分组
       * @param {*} groupId - 分组id
       */
      getMaterialByGroup(isOpen, groupId) {
        let parentId = this.groupTagList.filter((item) => item.id == groupId)[0].parentId
        this.groupId = groupId
        this.groupTagList.forEach((item) => {
          item.id != parentId && (item.isOpen = false)
        })
        if (!isOpen) {
          Mt_Util.FdpLog('yx_cblkjhf_cyfzdj') // 常用分组收起
          return
        }
        if (this.groupId === -1) {
          // 获取常用素材
          this.getCommonMaterialList()
          return
        }
        // parentId == 0 && (this.currentMaterialList = []);
        let params = {
          typeGroup: this.groupTypeCal,
          groupId: this.groupId,
          from: 2 // 判断来源 1.pc 2.企微
        }
        Mt_Util.post(
          '/ajax/wxWork/material/tsMaterial_h.jsp?cmd=getTsWxWorkMaterialList',
          params
        ).then((res) => {
          if (res.data && res.data.success) {
            // this[parentId == 0 ? 'currentMaterialList' : 'currentMaterialChildList'] = res.data.data
            this.setMaterialListByGroupId(groupId, res.data.data)
          } else if (res.data && res.data.rt !== 6040) {
            this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
          }
        })
      },
      /**
       * 获取审查信息
       * @author waldon
       * @date 2020/5/27
       */
      prepareCheck() {
        Mt_Util.post('/ajax/wxWork/material/tsMaterial_h.jsp?cmd=prepareCheck').then((res) => {
          if (res.data && res.data.success) {
            this.checkStatus = res.data.data
          } else if (res.data && res.data.rt !== 6040) {
            this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
          }
        })
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
      checkSize(item) {
        let category = item.category // 1:文档 2:图片 3:视频
        let size = item.size
        switch (category) {
          case 1:
            return size / 1024 / 1024 > 20
          case 2:
            return size / 1024 / 1024 > 2
          case 3:
            return size / 1024 / 1024 > 10
        }
      },
      /**
       * 设置对应groupId下的materialList
       * @author turbo
       * @date 2020-10-26
       * @param {Number} groupId - 分组id
       * @param {Array} materialList - 话术列表
       */
      setMaterialListByGroupId(groupId, materialList) {
        materialList.forEach((item) => {
          // 因为话术的展示用了v-html来实现搜索时关键词高亮，所以在设置对应分组下的话术列表时，需要encode一下以防XSS
          item.showText = Ts_util.encodeHtml(item.content)
        })
        this.groupTagList.forEach((item) => {
          item.id == groupId && (item.materialList = materialList)
        })
      },
      /**
       * 操作文件夹/文件
       * @author lymn
       * @date 2020-11-20
       * @param {Object} item 文件夹对象
       */
      operateFile(item) {
        if (item.isDir) {
          this.gotoChildFile(item)
        } else {
          this.sendMessage(item)
        }
      },
      /**
       * 获取子文件/文件夹
       * @author lymn
       * @date 2020-11-11
       */

      gotoChildFile(item) {
        if (item.isDir) {
          // 面包屑导航处理
          if (!this.filePath.length) {
            if (this.pageStatus == 'normal') {
              this.filePath = [
                {
                  typeGroup: this.normalSliderVal == 1 ? 12 : this.normalSliderVal == 3 ? 18 : 13,
                  name:
                    this.normalSliderVal == 1
                      ? '企业文件'
                      : this.normalSliderVal == 3
                      ? '产品文件'
                      : '我的文件'
                }
              ]
            } else if (this.pageStatus == 'search') {
              this.filePath = [
                {
                  id: -1,
                  name: '搜索'
                }
              ]
              this.pageStatus = 'result'
              this.fileRequestParam.name = '' // 清空搜索内容
            }
          }
          this.filePath.push({
            id: item.id,
            name: item.name
          })

          this.fileRequestParam.groupId = item.id
          this.otherCheckOption.pageNow = 1
          this.getFileList().then((data) => {
            this.fileList = data
          })
        } else {
        }
      },
      /**
       * 获取文件/文件夹列表
       * @author lymn
       * @date 2020-11-19
       * @param {Boolean} param
       * @return {Boolean} return
       */
      getFileList() {
        // 分组类型
        if (this.pageStatus == 'normal') {
          this.fileRequestParam.typeGroup = this.groupTypeCal
        } else {
          // 搜索时或搜索结果都传-1
          this.fileRequestParam.typeGroup = ''
        }
        let url
        if (this.groupTypeCal == 18) url = '/rest/manage/material/getProductMaterialList'
        else url = '/ajax/wxWork/material/tsMaterial_h.jsp?cmd=getFileMatList'
        console.log(url, this.groupTypeCal, '文件列表地址')
        return new Promise((resolve) => {
          Mt_Util.post(url, Object.assign({}, this.fileRequestParam, this.otherCheckOption)).then(
            (res) => {
              if (res.data && res.data.success) {
                this.otherCheckOption.maxPage = Math.ceil(
                  res.data.total / this.otherCheckOption.limit
                )
                resolve(res.data.data)
                // this.fileList = res.data.data
                resolve()
              } else if (res.data && res.data.rt !== 6040) {
                this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
              }
            }
          )
        })
      },
      /**
       * 面包屑导航切换
       * @author lymn
       * @date 2020-11-19
       */
      gotoFilePath(item, index) {
        if (index == 0) {
          if (this.pageStatus == 'result') {
            // 返回搜索页
            this.pageStatus = 'search' // 切换页面状态为搜索页
            this.fileRequestParam.name = this.fileSearchName
            this.fileRequestParam.groupId = -1 // 搜索时传-1
          } else {
            // 返回根目录
            // this.fileRequestParam.typeGroup = item.typeGroup
            this.fileRequestParam.groupId = ''
          }
          this.filePath = []
        } else {
          // 回退其他文件夹页
          this.fileRequestParam.groupId = item.id
        }
        this.otherCheckOption.pageNow = 1
        this.getFileList().then((data) => {
          this.fileList = data
          this.filePath = this.filePath.slice(0, index + 1)
        })
      },
      /**
       * 加载文件列表数据
       * @author lymn
       * @date 2020-11-20
       * @param {Boolean} param
       * @return {Boolean} return
       */
      loadBottom() {
        if (this.otherCheckOption.maxPage <= this.otherCheckOption.pageNow) {
          return
        }
        this.otherCheckOption.pageNow++
        this.getFileList().then((data) => {
          this.fileList = this.fileList.concat(data)
          // this.formDataList = this.formDataList.concat(list)
        })
      },
      /**
       * 取消搜索
       * @author lymn
       * @date 2020-11-23
       */
      cancelSearch() {
        // this.getMaterialListByName('')
        this.$refs.searchBox.searchVal = ''
        this.getMaterialListByName('')
      }
    },
    created() {
      if (!this.isProfVer) {
        return
      }
      Mt_Util.FdpLog('yx_cblkjhfbg') // 侧边栏快捷回复曝光
      this.getGroupTagList()
      this.getCommonMaterialList()
      this.prepareCheck()
    }
  })
})()
