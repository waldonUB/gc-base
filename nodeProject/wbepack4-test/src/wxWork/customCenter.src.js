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
  Mt_Util.router.customCenter = Vue.extend({
    name: 'customCenter',
    template: `
        <div class="customCenter">
            <div v-if="!isShowChild">
                <mt-nothing v-if="showEmpty" :emptyTips="emptyTips">
                    <div class="operateBox">
                        <mt-button v-if="showEmptyBtn" size="small" type="mainColor" @click="toVisit">{{btnText}}</mt-button>
                    </div>
                </mt-nothing>
                <div v-else="hasCustomer">
                    <div class="customInfoBox">
                        <img class="headImg" :src="headerInfo.wxHeadImgUrl">
                        <div class="customInfo">
                            <div class="nameInfo">
                                <div class="name" v-if="headerInfo.contacts && headerInfo.contacts !== headerInfo.wxName">
                                    {{headerInfo.contacts}}
                                    <span v-if="headerInfo.wxName" class="remark">（{{headerInfo.wxName}}）</span>
                                </div>
                                <div class="name" v-else>
                                    {{headerInfo.wxName}}
                                </div>
                                <el-popover
                                    v-if="isCancel"
                                    trigger="hover"
                                    placement="bottom"
                                >
                                    <span v-if="assistInfo.isAssist" slot="reference" class="assistIcon">协</span>
                                    <div class="popover-button" @click="cancelAssist">取消协助</div>
                                </el-popover>
                                <span v-else class="assistIcon">协</span>
                                <!-- <img class="editIcon" v-tsDebounce="[toEdit, 'click', 500]" :src="editIcon"> -->
                            </div>
                            <div class="mobile">{{headerInfo.mobile}}</div>
                        </div>
                        <div class="intentionWrap">
                            <el-popover
                                popper-class="intentionPopBox"
                                placement="bottom"
                                :width="50"
                                trigger="click">
                                <div 
                                    class="popoverItem"
                                    v-for="item in intentionList"
                                    @click="setIntention(item)"
                                    >
                                    {{item.key}}
                                </div>
                                <span slot="reference">
                                    <div class="intentionBox">
                                        <div class="circleBox" :class="intentionClassCal"></div>
                                        <div class="mainTextBox">
                                            <div class="noIntention" v-if="false"></div>
                                            <span v-else>{{headerInfo.intentionName}}</span>
                                        </div>
                                        <div class="desc">意向度</div>
                                    </div>
                                </span>
                            </el-popover>
                        </div>
                    </div>
                    <div class="statusStep">    
                        <div class="stepBox" ref="stepsView">
                            <div 
                                :class="['stepItem', {'stepItem_large' : item.name.length > 4}, {'stepItem_first': index == 0}, {'stepItem_end': index == frontStepList.length - 1}, {'active': (item.sort <= currentFollowSort || isEndStep)}]" 
                                v-for="(item, index) in frontStepList"
                                @click="setStatus(item)">
                                {{item.name}}
                            </div>
                        </div>
                        <div class="line"></div>
                        <el-popover
                            popper-class="stepEndBox"
                            placement="bottom"
                            trigger="click"
                            @show="showEndStep">
                            <div>
                                <div 
                                    class="popoverItem"
                                    v-for="(item, index) in endStepList"
                                    @click="setStatus(item, true, index)">
                                    {{item.name}}
                                </div>
                            </div>
                            <span slot="reference" class="endStatus">
                                <div 
                                    :class="['textBox', {'active': isEndStep}]" >
                                    {{ endFollowText || '成交情况'}}
                                </div>
                            </span>
                        </el-popover>
                    </div>
                    <mt-slider
                            slider-type="fontBlack"
                            :slider-val.sync="sliderVal"
                            :slider-array="slideList">
                    </mt-slider>
                    <div class="relateBox" v-if="isShowBind" v-for="item in showViewerList" :key="item.id" @click="toViewerDetail(item.id)">
                        <img class="headImg" :src="item.wxHeadImgUrl">
                        <div class="customInfo">
                            <div class="nameInfo">
                                <span class="name">{{item.wxName}}</span>
                            </div>
                            <div class="mobile">{{item.wxMobile}}</div>
                        </div>
                        <div class="relateBtn">
                            <mt-button size="small" type="mainColor" @click.stop="bindViewerById(item.id)">关联</mt-button>
                            <p v-if="isInDetail" @click.stop="seeNextViewer">查看其他访客</p>
                        </div>
                    </div>
                    <div class="subButtonBox" v-if="isShowAction">
                        <mt-button class="subButton" v-for="item in subList" :key="item.key" size="small" :type="item.key==subVal?'mainColor':'unSelected'" @click="chooseSubItem(item.key)">{{item.value}}</mt-button>
                        <mt-button v-if="isShowUnBind" class="unBindButton" size="small" type="red" @click="unBindViewer">解除关联</mt-button>
                    </div>
                    <mt-loadmore v-if="!nothingRecord"  v-infinite-scroll="loadBottom" ref="loadmore">
                        <div class="recordBox" v-if="sliderVal!==2">
                            <div class="productPart" v-if="subVal==1&&mallRelList.length > 0&&isShowAction">
                                <div class="titleBox">
                                    <p class="title">意向商品TOP10</p>
                                </div>
                                <div class="intentionProduct">
                                    <div class="productInfo" :class="allMallRelList.length > 3 ? '' : 'withoutMore'" v-for="item in mallRelList" :key="item.id">
                                        <div>
                                            <span class="productName">{{item.productName}}</span>
                                            <span class="countNum">浏览次数</span>
                                            <span class="num">{{item.visitCnt}}</span>
                                        </div>
                                        <div class="progressWrapper">
                                            <div class="progress" :style="{width: (item.visitCnt / maxCnt) * 100 + '%'}"></div>
                                        </div>
                                    </div>
                                    <mt-fold openText="更多信息" v-if="allMallRelList.length > 3" closeText="更多信息" @fold="getMore"></mt-fold>
                                </div>
                            </div>
                            <div class="clue" v-if="subVal==0&&isShowAction||sliderVal==1">
                                <div class="cluePart"  v-for="(item, index) in actionList" :key="index">
                                    <div class="splitDay titleBox">
                                        <span class="date">{{item.date}}</span>
                                        <span :class="getDateTip(item.date) ? 'dateTip' : ''">{{getDateTip(item.date)}}</span>
                                    </div>
                                    <div class="splitDayWrapper">
                                        <div class="childItem titleBox" v-for="(subItem, subIndex) in item.list" :key="subIndex">
                                            <div class="actionBox" v-if="sliderVal==0">
                                                <div class="mainActionBox" :class="subItem.list.length ? 'withSubAction' : ''">
                                                    <div class="mainLine">
                                                        <div class="typeName">{{subItem.typeName}}</div>
                                                        <div class="actionFrom">{{subItem.sidName}}</div>
                                                        <div class="createTimeName">{{subItem.createTimeName}}</div>
                                                    </div>
                                                    <div class="subLine title" v-if="subItem.dataTitle">
                                                        <div class="labelTip">标题：</div>
                                                        <div class="content">{{subItem.dataTitle}}</div>
                                                    </div>
                                                    <div class="subLine duration" v-if="getIsShowDuration(subItem.type)" :class="subItem.dataTitle ? '' : 'withoutTitle'">
                                                        <div class="labelTip">时长：</div>
                                                        <div class="content">{{subItem.visitTimeName}}</div>
                                                    </div>
                                                </div>
                                                <div class="subActionBox" v-if="subItem.list.length">
                                                    <div class="subTitle">TA还做了以下行为</div>
                                                    <div class="subActionWrapper">
                                                        <div class="subActionLine" v-for="(thirdItem, thirdIndex) in subItem.list" :key="thirdIndex">
                                                            <div class="actionTag">{{thirdItem.typeName.slice(0, 2)}}</div>
                                                            <div class="actionText">{{thirdItem.typeName}}</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="actionBox" v-else>
                                                <div class="titleInfo">
                                                    <div class="leftInfo"><span class="articleTitle">{{subItem.typeName}}</span>
                                                    <span class="sales">{{subItem.sidName}}</span></div>
                                                    <div class="createTimeName">{{subItem.createTimeName}}</div>
                                                </div>
                                                <div class="explainBox">
                                                    <div class="explain">
                                                        <span>{{followSubTypeNameCal(subItem.type)}}</span>
                                                        <span v-if="subItem.type !== 1">{{subItem.remark}}</span>
                                                        <span v-else>{{subItem.modifyStr}}</span>
                                                    </div>
                                                    <div class="explain" v-if="subItem.visitTimeName">
                                                        回访时间：
                                                        <span>{{subItem.visitTimeName}}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <p v-show="isMoreLoading" class="page-infinite-loading">
                                    <mt-spinner type="fading-circle"></mt-spinner>
                                    <span class="loadingText">加载中...</span>
                                </p>
                            </div>
                        </div>
                    </mt-loadmore>
                    <mt-nothing v-else-if="sliderVal==1||isShowAction" :emptyTips="actionEmptyTips" :noPadding="true"></mt-nothing>
                    <mt-buttonWrapper v-if="sliderVal===1">
                        <mt-button size="large" type="mainColor" @click="addFollow">写跟进</mt-button>
                    </mt-buttonWrapper>
                    <div class="customerInfo" v-if="sliderVal===2">
                        <div class="infoItem">
                            <p class="itemTitle">标签</p>
                            <div class="tagBox">
                                <mt-tag :tagText="item.tag_name" type="personTag" class="tagItem" v-for="(item,index) in personTagList" :key="'p_'+index"></mt-tag>
                                <mt-tag :tagText="item" class="tagItem" v-for="(item,index) in tagList" :key="'c_'+index"></mt-tag>
                                <mt-button type="mainColor" class="tagBtn" @click="toAddTag" size="mini">+打标签</mt-button>
                            </div>
                        </div>
                        <mt-formGap :titleIcon="infoIcon" title="个人信息"></mt-formGap>
                        <div class="infoItem" v-for="(item,index) in customInfoList" v-if="item.isAble" :key="item.label">
                            <p class="itemTitle">{{item.label}}</p>
                            <p class="text">{{item.value}}</p>
                        </div>
                        <div class="infoItem" v-for="(item,index) in personFieldsList" v-if="item.unable===0" :key="item.id">
                            <p class="itemTitle">{{item.name}}</p>
                            <a v-if="item.ossUrl" class="text ossUrl" :href="item.ossUrl" target="_blank" @click="jumpUrl(item.ossUrl)">{{item.valuesName}}</a>
                            <span v-else class="text">{{item.valuesName}}</span>
                        </div>
                        <div v-if="isShowOtherInfo">
                            <mt-formGap :titleIcon="companyIcon" title="其他信息"></mt-formGap>
                            <div class="infoItem" v-for="(item,index) in otherInfoList" v-if="item.isAble" :key="item.label">
                                <p class="itemTitle">{{item.label}}</p>
                                <p class="text">{{item.value}}</p>
                            </div>
                            <div class="infoItem" v-for="(item,index) in otherFieldsList" v-if="item.unable===0" :key="item.id">
                                <p class="itemTitle">{{item.name}}</p>
                                <p class="text">{{item.valuesName}}</p>
                            </div>
                        </div>
                        <mt-formGap :titleIcon="followIcon" title="销售信息"></mt-formGap>
                        <div class="infoItem">
                            <div class="itemTitle">协助人</div>
                            <div class="text">{{assistInfo.assistNames}}</div>
                        </div>
                        <div class="infoItem" v-for="(item,index) in saleInfoList" :key="item.label">
                            <p class="itemTitle">{{item.label}}</p>
                            <p class="text">{{item.value}}</p>
                        </div>
                        <mt-formGap :titleIcon="qiweiIcon" title="企微信息"></mt-formGap>
                        <div class="qiweiInfoBox">
                            <p class="title"><span>销售员</span><span class="num">({{tsWxWorkUserList.length}})</span><p>
                            <div class="sales">
                                <div class="saleItem" v-for="item in tsWxWorkUserList" :key="item.id">
                                    <img class="headImg" :src="item.avatar">
                                    <p>{{item.name}}</p>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="infoItem">
                            <div class="itemTitle">协助人</div>
                            <div class="text">{{assistInfo.assistNames}}</div>
                        </div> -->
                        <mt-input v-if="tsWxWorkGroupChatList.length===0" type="text" label="企微群" placeholder="该客户暂未加入任何企微群" :disabled="true"></mt-input>
                        <div v-else class="qiweiInfoBox marginGap">
                            <p class="title groupsTitle"><span>企微群</span><span class="num">({{tsWxWorkGroupChatList.length}})</span><p>
                            <div class="groupsItem" v-for="item in tsWxWorkGroupChatList" :key="item.id">
                                <img :src="getImgAddress('/common/group.png')" class="gropImg">
                                <div>
                                    <p class="group-title">{{item.groupChatName}}</p>
                                    <p class="io-group">{{ showGroup(item.isInChat) }}</p>
                                    <p class="groupHolder">群主：{{item.ownerName}}</p>
                                </div>
                            </div>
                        </div>
                         <div class="infoItem" v-for="(item,index) in qwInfoList" :key="item.label">
                            <p class="itemTitle">{{item.label}}</p>
                            <p class="text">{{item.value}}</p>
                        </div>
                        <div class="infoItem">
                            <p class="itemTitle">备注手机</p>
                            <p class="text">{{headerInfo.mobiles}}</p>
                        </div>
                        <div class="infoItem">
                            <p class="itemTitle">备注描述</p>
                            <p class="text">{{headerInfo.description}}</p>
                        </div>
                        <mt-buttonWrapper>
                            <mt-button size="large" type="mainColor" @click="toEdit">编辑</mt-button>
                        </mt-buttonWrapper>
                    </div>
                </div>
            </div>
            <keep-alive include="editCustom">
                <router-view></router-view>
            </keep-alive>
        </div>
    `,
    data() {
      return {
        isCancel: true,
        isPc: false,
        isShowChild: false, //判断显示子组件还是当前组件
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
        hasCustomerEmpty: '', //获取客户详情后失败的文案（分配给其他销售、释放、没同步）
        //外部联系人id
        externalUserId: 0,
        //客户id
        customerId: 0,
        //头部的客户信息（企微）
        headerInfo: {
          address: '',
          area: '',
          contacts: '',
          wxName: '',
          remark: '',
          mobile: '',
          wxHeadImgUrl: '',
          intention: '',
          intentionName: '',
          description: '',
          mobiles: ''
        },
        //标签列表
        tagList: [],
        personTagList: [],
        clientTagList: [],
        //销售员
        tsWxWorkUserList: [],
        // 协助人信息
        assistInfo: {},
        //群聊
        tsWxWorkGroupChatList: [],
        //个人信息
        customInfoList: [
          {
            label: '姓名',
            key: 'contacts',
            value: '',
            isAble: false
          },
          {
            label: '昵称',
            key: 'wxName',
            value: '',
            isAble: false
          },
          {
            label: '手机',
            key: 'mobile',
            value: '',
            isAble: false
          },
          {
            label: '类型',
            key: 'dataSourceName',
            value: '',
            isAble: true
          },
          {
            label: '性别',
            key: 'sex',
            value: '',
            isAble: false
          },
          {
            label: '生日',
            key: 'birthday',
            value: '',
            isAble: false
          },
          {
            label: '微信',
            key: 'wx',
            value: '',
            isAble: false
          },
          {
            label: 'QQ',
            key: 'qq',
            value: '',
            isAble: false
          },
          {
            label: '证件号',
            key: 'idCard',
            value: '',
            isAble: false
          }
        ],
        //其他信息
        otherInfoList: [
          {
            label: '企业',
            key: 'corpName',
            value: '',
            isAble: false
          },
          {
            label: '行业',
            key: 'industry',
            value: '',
            isAble: false
          },
          {
            label: '职位',
            key: 'position',
            value: '',
            isAble: false
          },
          {
            label: '获客方式',
            key: 'customersWay',
            value: '',
            isAble: false
          },
          {
            label: '区域',
            key: 'province',
            value: '',
            isAble: false
          },
          {
            label: '地址',
            key: 'address',
            value: '',
            isAble: false
          },
          {
            label: '来源',
            key: 'source',
            value: '',
            isAble: true
          },
          {
            label: '上级人脉',
            key: 'fromViewerId',
            value: '',
            isAble: false
          },
          {
            label: '备注',
            key: 'remark',
            value: '',
            isAble: false
          }
        ],
        //销售信息
        saleInfoList: [
          {
            label: '回访时间',
            key: 'visitsTimeName',
            value: ''
          },
          {
            label: '客户关联时间',
            key: 'salesRelTime',
            value: ''
          },
          {
            label: '最近访问时间',
            key: 'lastVisitsTimeName',
            value: ''
          },
          {
            label: '最近跟进时间',
            key: 'updateTimeName',
            value: ''
          },
          {
            label: '客户创建时间',
            key: 'createTimeName',
            value: ''
          }
        ],
        //企微信息
        qwInfoList: [
          {
            label: '企微来源',
            key: 'wxWorkSourceName',
            value: ''
          },
          {
            label: '企微渠道',
            key: 'wxWorkChannelName',
            value: ''
          },
          {
            label: '备注名',
            key: 'remark',
            value: ''
          },
          {
            label: '备注企业',
            key: 'remarkCorpName',
            value: ''
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
        isCheckedApplication: true, // 没勾选可调应用
        personFieldsList: [], //个人信息
        otherFieldsList: [], //其他信息
        isShowOtherInfo: false, //是否显示其他信息
        customInfotimeStamp: 0, // 时间戳，用于后端防止恶意请求
        // 跟进阶段设置
        followStatusList: [], // 跟进阶段列表
        frontStepList: [], // 跟进阶段列表前部分
        endStepList: [], // 跟进阶段列表后部分-成交情况
        isEndStep: false, // 当前阶段是否位于成交情况阶段
        endFollowText: '', // 成交情况-文案
        currentFollowStatus: 0, // 当前阶段的id
        currentFollowSort: 0, // 当前阶段在步骤条中的排序
        // 意向度设置
        intentionList: [
          {
            // 意向度列表
            key: '高',
            value: 1
          },
          {
            key: '中',
            value: 2
          },
          {
            key: '低',
            value: 3
          }
        ],
        hasFuncPermission: true // 是否有显示该功能的权限
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
      mtFold
    },
    async created() {
      //根据地址判断显示的组件
      this.isShowChild = this.$route.path.match(/\w+/gi).length >= 2
      if (!this.isProfVer) {
        // 如果没有版本就不执行后面的逻辑
        return
      }
      let staffOption = {
        isRoleAuth: true,
        func: 'customerDetail'
      }
      this.hasFuncPermission = await Mt_Util.getStaffInfo(staffOption)
      if (!this.hasFuncPermission) {
        // 如果没有权限直接显示缺省页
        return
      }
      this.isPc = !/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
      console.log(this.isPc)
      Mt_Util.FdpLog('yx_cblkhxq') // 侧边栏客户详情曝光
      Mt_Util.initWxConfig().then(() => {
        Mt_Util.checkIsOutGroup().then((res) => {
          if (!res) {
            this.getCurExternalContact().then((externalUserId) => {
              // 获取userid
              this.externalUserId = externalUserId
              this.getFollowStatusList().then(() => {
                //有客户信息才查访客
                this.getCustomInfo().then(() => {
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
                            .then(() => {
                              this.isShowViewList = true
                              Mt_Util.post('/ajax/staff/tsStaff_h.jsp?cmd=setStaffFlag', {
                                showViewerListTip: 1
                              })
                            })
                        }
                      })
                    }
                    this.viewerList = [].concat(viewerInfo.viewerList)
                    if (this.viewerList.length > 0) {
                      this.currentViewerId = this.viewerList[0].id
                      this.showViewerList = this.viewerList
                      this.bindViewerId = viewerInfo.bindViewerId
                      Promise.all([this.getActionList(), this.getMallRelList()])
                    }
                  })
                  // this.getFollowStatusList();
                })
              })
            })
          }
        })
      })
    },
    watch: {
      //监听一级tab变化
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
      //监听路有变化
      $route(to, from) {
        this.isShowChild = this.$route.path.match(/\w+/gi).length >= 2
        this.$route.query.changeTab && (this.sliderVal = 2)
      },
      //监听当前阶段变化
      currentFollowStatus(newVal) {
        this.endFollowText = ''
        this.isEndStep = false
        this.endStepList.find((item) => {
          if (item.id == newVal) {
            this.isEndStep = true
            this.endFollowText = item.name
            return true
          }
        })

        this.setCurrentFollowScrollLeft()
      }
    },
    computed: {
      hasBindViewer() {
        return this.bindViewerId !== 0
      },
      /**
       * 显示行为（互动行为tab, 没有同名访客或者查看访客详情）
       * @author guoyijie
       * @date 2020-08-19
       * @returns {boolean}
       */
      isShowAction() {
        return (
          this.sliderVal == 0 &&
          (this.viewerList.length <= 1 || this.isInDetail || this.bindViewerId !== 0)
        )
      },
      /**
       * 显示解绑按钮（ 有绑定， 同名访客多位， 互动行为tab)
       * @author guoyijie
       * @date 2020-08-19
       * @returns {boolean}
       */
      isShowUnBind() {
        return this.viewerList.length > 1 && this.bindViewerId !== 0 && this.sliderVal == 0
      },
      /**
       * 显示关联按钮（ 无绑定， 同名访客多位， 互动行为tab)
       * @author guoyijie
       * @date 2020-08-19
       * @returns {boolean}
       */
      isShowBind() {
        return this.viewerList.length > 1 && this.bindViewerId == 0 && this.sliderVal == 0
      },
      /**
       * 版本权限
       * @author guoyijie
       * @date 2020-08-19
       * @returns {boolean}
       */
      isProfVer() {
        return initTsParam.isPower
      },
      /**
       * 意向度class
       * @author guoyijie
       * @date 2020-08-19
       * @returns {String}
       */
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
       * 是否显示行为和跟进缺省页
       * @author guoyijie
       * @date 2020-08-19
       * @returns {boolean}
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
       * 版本缺省提醒文案
       * @author waldon
       * @date 2020-06-05
       * @returns {string}
       */
      emptyTips() {
        if (!this.isProfVer) {
          return '当前版本不支持该功能，请升级版本'
        } else if (!this.isCheckedApplication) {
          return '未设置可调用应用，无法正常使用，请按教程重新进行设置'
        } else if (!this.hasFuncPermission) {
          return '暂无获客工具和客户管理权限，请联系管理员开启'
        } else if (!this.isSyncCustomerInfo) {
          return '由于网络原因，当前未获取到该客户信息，请点击下方按钮再次查询'
        } else if (!this.hasCustomer) {
          return this.hasCustomerEmpty
        }
      },
      /**
       * 是否显示客户详情页缺省页
       * @author guoyijie
       * @date 2020-08-19
       * @returns {boolean}
       */
      showEmpty() {
        return (
          !this.isCheckedApplication ||
          !this.hasCustomer ||
          !this.isProfVer ||
          !this.hasFuncPermission
        )
      },
      /**
       * 是否显示缺省页按钮
       * @author guoyijie
       * @date 2020-08-19
       * @returns {boolean}
       */
      showEmptyBtn() {
        return (
          (!this.isCheckedApplication || !this.isSyncCustomerInfo || !this.isProfVer) &&
          this.hasFuncPermission
        )
      },
      /**
       * 缺省页按钮文案
       * @author guoyijie
       * @date 2020-08-19
       * @returns {string}
       */
      btnText() {
        if (!this.isProfVer || !this.isCheckedApplication) {
          return '去了解'
        } else {
          // return '查看教程'
          return '再次查询'
        }
      },
      /**
       * 缺省页跳转链接
       * @author guoyijie
       * @date 2020-08-19
       * @returns {string}
       */
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
      //获取图片
      getImgAddress(url) {
        return `${resRoot}/image/wxwork${url}?v=202012211024`
      },
      /**
       * 判断是否在群里
       * @author han
       * @date 2021-02-03
       * @param {Boolean} isInGroup - 是否在群里
       */
      showGroup(isInGroup) {
        return isInGroup ? '我已加群' : '我未加群'
      },
      /**
       * 链接跳转
       * @author guoyijie
       * @date 2020-11-16
       * @param {String} url - 跳转链接
       */
      jumpUrl(url) {
        if (Mt_Util.getTemp()) {
          window.open(url)
        } else {
          // 在默认浏览器打开redirect_uri，并附加code参数；也可以直接指定要打开的url，此时不会附带上code参数。
          wx.invoke(
            'openDefaultBrowser',
            {
              url: url
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
       * 二级跟进记录类型名
       * @author waldon
       * @date 2020-09-15
       * @param {String} type - 跟进类型
       */
      followSubTypeNameCal(type) {
        switch (type) {
          case 0:
            return '跟进内容：'
          case 1:
            return '修改字段：'
          case 2:
            return '短信内容：'
          case 3:
            return '推进跟进阶段：'
          default:
            return '跟进内容：'
        }
      },
      /**
       * 检查是否提示关联弹窗
       * @author guoyijie
       * @date 2020-08-19
       * @returns {boolean}
       */
      checkFlag() {
        return new Promise((resolve) => {
          Mt_Util.post('/ajax/staff/tsStaff_h.jsp?cmd=checkFlag', {
            showViewerListTip: 1
          }).then((res) => {
            resolve(res.data.data.showViewerListTip)
          })
        })
      },
      /**
       * 初始化行为和跟进记录
       * @author guoyijie
       * @date 2020-08-19
       * @returns {boolean}
       */
      initData() {
        this.actionList = []
        this.actionParams.pageNow = 1
      },
      /**
       * 初始化标签
       * @author guoyijie
       * @date 2020-08-19
       * @returns {boolean}
       */
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
      /**
       * 写跟进跳转
       * @author guoyijie
       * @date 2020-08-19
       */
      addFollow() {
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
      /**
       * 获取更多商品
       * @author guoyijie
       * @date 2020-08-19
       */
      getMore(isMore) {
        if (isMore) {
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
      /**
       * 去编辑
       * @author guoyijie
       * @date 2020/8/13
       * */
      toEdit() {
        timeInfo.state.externalUserId = this.externalUserId
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
        return new Promise((resolve) => {
          let params = {
            externalUserId: this.externalUserId
          }
          if (this.customInfotimeStamp) params.timeStamp = this.customInfotimeStamp
          Mt_Util.post('/rest/manage/client/getTsClientByWxWork', params).then((res) => {
            if (res.data && res.data.success) {
              let customerData = res.data.data
              timeInfo.state.isSalesCustomer = customerData.isSalesCustomer
              this.hasCustomer = true
              this.customerId = customerData.id
              // this.currentFollowStatus = customerData.followStatus ? customerData.followStatus : this.followStatusList[0].id; // 如果之前未设置过，初始值为第一个阶段
              let wxWorkRemark = customerData.wxWorkRemark
              let systemFieldAbleConf = customerData.systemFieldAbleConf
              this.personFieldsList = []
              this.otherFieldsList = []
              let otherKeyList = [
                'corpName',
                'industry',
                'position',
                'area',
                'address',
                'remark',
                'customersWay'
              ]
              this.isShowOtherInfo = otherKeyList.some((item) => {
                if (systemFieldAbleConf[item]) {
                  return true
                }
              })
              for (let item of customerData.crmFieldDataList) {
                if (item.groupId == 0) {
                  this.personFieldsList.push(item) //个人信息
                } else {
                  if (item.unable === 0) {
                    this.isShowOtherInfo = true
                  }
                  this.otherFieldsList.push(item)
                }
              }
              //头部需要的信息
              if (wxWorkRemark !== undefined) {
                this.headerInfo.description = wxWorkRemark.description
                this.headerInfo.mobiles = ''
                if (wxWorkRemark.mobiles != undefined && wxWorkRemark.mobiles.length > 0) {
                  for (let i of wxWorkRemark.mobiles) {
                    this.headerInfo.mobiles += i + ';'
                  }
                  this.headerInfo.mobiles = this.headerInfo.mobiles.substring(
                    0,
                    this.headerInfo.mobiles.length - 1
                  )
                }
              }
              for (let key in this.headerInfo) {
                if (customerData[key] !== undefined) {
                  this.headerInfo[key] = customerData[key]
                }
              }
              this.clientTagList = customerData.clientTagList || []
              this.personTagList = wxWorkRemark.personTagList || []
              this.initTagList(customerData.clientTagList) //标签
              this.tsWxWorkUserList = [].concat(customerData.tsWxWorkUserList) //销售员
              this.assistInfo = customerData.assistInfo // 协助人信息
              this.tsWxWorkGroupChatList = [].concat(customerData.tsWxWorkGroupChatList) //群组
              //客户信息
              this.customInfoList.forEach((item) => {
                item.isAble =
                  systemFieldAbleConf[item.key] !== undefined ? systemFieldAbleConf[item.key] : true
                if (customerData[item.key] !== undefined) {
                  if (item.key === 'sex') {
                    item.value = customerData.sexName
                  } else if (item.key === 'birthday') {
                    item.value = customerData.birthdayStr
                  } else {
                    item.value = customerData[item.key]
                  }
                }
              })
              console.log(this.customInfoList)
              //其他信息
              this.otherInfoList.forEach((item) => {
                item.isAble =
                  systemFieldAbleConf[item.key] !== undefined ? systemFieldAbleConf[item.key] : true
                if (customerData[item.key] !== undefined) {
                  if (item.key === 'industry') {
                    item.value = customerData.industryName
                  } else if (item.key === 'fromViewerId') {
                    item.value = customerData.fromViewerName
                  } else if (item.key === 'customersWay') {
                    item.value = customerData.customersWayName
                  } else if (item.key === 'source') {
                    item.value = customerData.sourceName
                  } else if (item.key === 'province') {
                    //区域=省+市
                    item.isAble = systemFieldAbleConf.area
                    item.value = customerData.province + customerData.city
                    console.log(item.value)
                  } else {
                    item.value = customerData[item.key]
                  }
                }
              })
              console.log(this.otherInfoList)
              //销售信息
              this.saleInfoList.forEach((item) => {
                if (customerData[item.key] !== undefined) {
                  item.value =
                    item.key == 'salesRelTime'
                      ? Ts_util.format.formatDate(customerData[item.key], 'yyyy-MM-dd HH:mm:ss')
                      : customerData[item.key]
                }
              })

              //企微信息
              wxWorkRemark &&
                this.qwInfoList.forEach((item) => {
                  item.value = wxWorkRemark[item.key]
                  if (item.key === 'wxWorkChannelName') {
                    item.value = customerData.wxWorkChannelName
                  } else if (item.key === 'wxWorkSourceName') {
                    item.value = customerData.wxWorkSourceName
                  }
                })

              this.setInitStatus(customerData.followStatus)
              this.setCurrentFollowScrollLeft()
              resolve()
            } else {
              if (res.data.rt == -6 || res.data.rt == -9 || res.data.rt == -3) {
                this.hasCustomer = false
                this.hasCustomerEmpty = res.data.msg
                if (res.data.rt == -3) {
                  // 数据未同步
                  this.isSyncCustomerInfo = false
                  this.customInfotimeStamp = res.data.data
                }
              } else if (res.data && res.data.rt !== 6050) {
                this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
              }
            }
          })
        })
      },
      /**
            * 获取访客列表
            1. 同名访客为0时， 跳到缺省页
            2. 同名访客为1时， 无论是否绑定都跳到详情页 (不显示关联和解绑按钮）*
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
       * @param {number} id - 访客id
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
                      if (!this.isInDetail) {
                        // 如果本身就是留在详情页面的，就不重新查询了
                        this.currentViewerId = id
                        this.initData()
                        Promise.all([this.getActionList(), this.getMallRelList()]).then((res) => {
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
                      this.isShowViewList = true //回到显示访客列表
                      // this.showViewerList = this.viewerList.find(item=>{
                      //     return item.id == this.currentViewerId;
                      // })
                      this.showViewerList = this.viewerList
                      this.isInDetail = false
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
       * @author guoyijie
       * @date 2020/8/13
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
      toVisit() {
        console.log('toVisit===')
        if (!this.isCheckedApplication || !this.isProfVer) {
          this.toVisitBlog()
        } else if (!this.isSyncCustomerInfo) {
          // 同步数据
          this.getCustomInfo()
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
      /**
       * 跳转到访客详情
       * @author guoyijie
       * @date 2020/8/13
       * @param {number} id - 访客id
       */
      toViewerDetail(id) {
        this.currentViewerId = id
        if (this.isInDetail) {
          return
        }
        this.isInDetail = true
        this.getViewerInfo()
      },
      /**
       * 筛选当前访客信息，行为信息
       * @author guoyijie
       * @date 2020/8/13
       */
      getViewerInfo() {
        this.initData()
        let obj = this.viewerList.find((item) => {
          return item.id == this.currentViewerId
        })
        this.showViewerList = [].concat(obj)
        Promise.all([this.getActionList(), this.getMallRelList()])
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
              this.actionList = this.actionList.concat(res[0])
              this.isMoreLoading = false
            })
        }
      },
      /**
       * 获取互动行为
       * @author guoyijie
       * @date 2020/8/13
       */
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
      /**
       * 获取商品行为
       * @author guoyijie
       * @date 2020/8/13
       */
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
      /**
       * 初始化跟进记录
       * @author guoyijie
       * @date 2020/8/13
       */
      initFollowList() {
        this.getFollowList().then((list) => {
          this.actionList = [].concat(list)
        })
      },
      /**
       * 获取跟进记录
       * @author guoyijie
       * @date 2020/8/13
       */
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
      /**
       * 添加标签
       * @author guoyijie
       * @date 2020/8/13
       */
      toAddTag() {
        this.$router.push({
          name: 'addTag',
          query: {
            selectedTagList: this.toTagJson(this.clientTagList),
            id: this.customerId,
            type: 1
          }
        })
      },
      /**
       * 转化格式
       * @author guoyijie
       * @date 2020/8/13
       */
      toTagJson(list) {
        let arr = []
        if (Array.isArray(list)) {
          list.forEach((item) => {
            if (Array.isArray(item.tag)) {
              item.tag.forEach((subItem) => {
                arr.push(subItem)
              })
            }
          })
        }
        return arr
      },
      /**
       * 获取跟进阶段列表
       * @author lymn
       * @date 2020/09/28
       */
      getFollowStatusList() {
        return new Promise((resolve) => {
          Mt_Util.post('/ajax/wxWork/client/tsClient_h.jsp?cmd=initTsClient').then((res) => {
            if (res.data && res.data.success) {
              this.followStatusList = res.data.data.followStatusList
              this.frontStepList = this.followStatusList.slice(0, -2)
              this.endStepList = this.followStatusList.slice(-2)
              console.log(this.followStatusList, '跟进阶段')
              resolve()
            } else {
              this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
            }
          })
        })
      },
      /**
       * 设置跟进阶段
       * @author lymn
       * @date 2020/09/28
       * @param {Object} data 跟进阶段对象
       * @param {Boolean} isEnd 是否为成交情况阶段
       * @param {Number} index 0：成交 1：未成交
       */
      setStatus(data, isEnd, index) {
        if (isEnd) {
          Mt_Util.FdpLog('yx_gjjdjg', {
            // 跟进阶段结果
            yx_free_text_0: `点击${index == 0 ? '成交' : '未成交'}`,
            yx_app_terminal: 4
          })
        } else {
          Mt_Util.FdpLog('yx_gjjd', {
            // 跟进阶段结果
            yx_free_int_0: data.id,
            yx_app_terminal: 4
          })
        }
        this.$messagebox
          .confirm('', {
            title: '跟进阶段变更',
            message: `确定该客户已进入${Ts_util.encodeHtml(data.name)}阶段`
          })
          .then(() => {
            let params = {
              cid: this.customerId,
              followStatus: data.id
            }
            Mt_Util.post('/ajax/client/tsClient_h.jsp?cmd=setTsClientFollowStatus', params).then(
              (res) => {
                if (res.data && res.data.success) {
                  this.currentFollowStatus = data.id
                  this.currentFollowSort = data.sort
                } else {
                  this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                }
              }
            )
          })
      },
      /**
       * 显示成交情况弹窗
       * @author lymn
       * @date 2020/09/28
       */
      showEndStep() {
        Mt_Util.FdpLog('yx_gjjdjg', {
          // 跟进阶段结果
          yx_free_text_0: '弹窗曝光',
          yx_app_terminal: 4
        })
      },
      /**
       * 设置客户的初始跟进阶段,考虑阶段被删除的可能性
       * @author lymn
       * @date 2020/09/28
       * @param {Number} status 跟进阶段的id
       */
      setInitStatus(status) {
        if (status == 0) {
          this.currentFollowStatus = this.followStatusList[0].id
          this.currentFollowSort = this.followStatusList[0].sort
        } else {
          let currentItem = this.followStatusList.find((item) => {
            // 判断当前所处阶段是否被删除
            return item.id == status
          })
          this.currentFollowStatus = currentItem ? status : this.followStatusList[0].id
          this.currentFollowSort = currentItem ? currentItem.sort : this.followStatusList[0].sort
        }
      },
      /**
       * 设置意向度
       * @author lymn
       * @date 2020-09-29
       * @param {Object} data 数据对象
       */
      setIntention(data) {
        let params = {
          cid: this.customerId,
          intention: data.value
        }
        Mt_Util.post('/ajax/client/tsClient_h.jsp?cmd=setTsClientIntention', params).then((res) => {
          if (res.data && res.data.success) {
            console.log('设置意向度成功')
            this.$messagebox({
              message: '设置意向度成功',
              closeOnClickModal: false
            }).then(() => {
              this.headerInfo.intention = data.value
              this.headerInfo.intentionName = data.key
            })
          } else {
            this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
          }
        })
      },
      /**
       * 设置当前字段居中
       * @author lymn
       * @date 2020-09-29
       */
      setCurrentFollowScrollLeft() {
        this.$nextTick(() => {
          let curIndex, left
          let stepView = document.querySelector('.stepBox')
          console.log('设置跟进阶段居中=================')
          let boxScrollWidth = stepView.scrollWidth
          if (!this.isEndStep) {
            this.frontStepList.find((item, index) => {
              if (item.id == this.currentFollowStatus) {
                curIndex = index
                return true
              }
            })
            let chilren = stepView.children[curIndex]
            let stepLeft = chilren.offsetLeft - 0.43 * g_rem
            left = stepLeft
          } else {
            left = boxScrollWidth
          }
          document.querySelector('.stepBox').scrollLeft = left
        })
      },
      /**
       * 取消协助
       * @author turbo
       * @date 2020-11-6
       */
      cancelAssist() {
        this.isCancel = false
        this.$messagebox
          .confirm('', {
            title: '提醒',
            message: '确认不再协助跟进该客户吗？'
          })
          .then(() => {
            Mt_Util.post('/ajax/wxWork/client/tsClient_h.jsp?cmd=unbindAssistClient', {
              cid: this.customerId
            }).then((res) => {
              this.$messagebox('提示', (res.data && res.data.msg) || '网络错误，请稍候重试').then(
                () => {
                  res.data && res.data.success && this.getCustomInfo()
                }
              )
            })
          })
          .finally(() => {
            this.isCancel = true
          })
      }
    }
  })
})()
