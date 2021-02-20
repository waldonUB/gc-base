(() => {
    let mtNothing = mtComponents.mtNothing;
    let mtFormGap = mtComponents.mtFormGap;

    // 群详情 (目前针对的是外部群)
    Mt_Util.router.groupCenter = Vue.extend({
        name: "groupCenter",
        template: `
            <div class="groupCenter">
                <mt-nothing v-if="showEmpty" emptyTips="该群群主非本公司成员无法查看群信息"></mt-nothing>
                <div v-else>
                    <div class="groupCenter-head">
                        <div class="groupCenter-head-details">
                            <div class="groupCenter-head-left">
                                <img class="groupHead" :src="groupHead">
                                <div class="group-details-content">
                                    <p class="groupName">{{groupName}}</p>
                                    <p class="groupInfo">
                                        <span class="groupInfo-mainClient">群主：{{ownerName}}</span>
                                        <span class="groupInfo-createTime">建群：{{createTimeName}}</span>
                                    </p>
                                </div>
                            </div>
                            <div class="groupCenter-head-right" @click="showMsg">
                                <span class="groupMsgIcon"></span>公告
                            </div>
                        </div>
                        <div class="groupCenter-data">
                            <div class="groupData-list">
                                <div class="groupData-item"
                                    v-for="(item, index) in groupDataList">
                                    <span class="groupData-item-number">{{item.number}}</span>
                                    <span class="groupData-item-name">{{item.name}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="groupCenter-list">
                        <mt-formGap bindClass="groupCenter-list-gap" title="群成员">
                            <div class="rightPart">
                                <el-dropdown @command="setGroupType" trigger="click">
                                    <span class="el-dropdown-link">
                                        {{groupTypeText}}<i class="el-icon-arrow-down el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item
                                        v-for="(item, index) in groupTypeList"
                                        :key="index"
                                        :command="item.value">
                                            {{item.key}}
                                        </el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </mt-formGap>
                        <mt-loadmore
                            infinite-scroll-disabled="loading"
                            v-infinite-scroll="loadBottom"
                            infinite-scroll-immediate-check="false"
                            ref="loadmore">
                            <div class="groupCenter-client-list">
                                <div
                                    class="groupClient-item"
                                    v-for="(item, index) in groupClient"
                                    :key="index"
                                    @click="seeDetails(item)">
                                    <img class="clientImg" :src="item.headImg">
                                    <div class="clientInfo">
                                        <div class="clientDetails">
                                            <span>{{item.name}}</span>
                                            <span v-if="item.corpName" :class="['clientType', getTypeClass(item)]">{{item.corpName}}</span>
                                        </div>
                                        <div class="intoWay">
                                            {{item.joinSceneName}}: {{item.joinTimeName}}
                                        </div>
                                    </div>
                                    <div class="lookMore"></div>
                                </div>
                            </div>
                        </mt-loadmore>
                    </div>
                </div>
            </div>
        `,
        components: {
            mtNothing,
            mtFormGap
        },
        data () {
            return {
                groupId: '', // 群Id
                groupName: '', // 群名称
                ownerName: '', // 群主名称
                createTimeName: '', // 创建时间
                notice: '', // 群公告
                loading: false, // 若为真，则无限滚动不会被触发
                showEmpty: false, // 是否显示缺省页
                groupDataList: [{
                    key: 'total',
                    name: '群人数',
                    number: 0
                }, {
                    key: 'myFriendsTotal',
                    name: '我的好友',
                    number: 0
                }, {
                    key: 'todayTotal',
                    name: '今日进群',
                    number: 0
                },  {
                    key: 'todayOutTotal',
                    name: '今日退群',
                    number: 0
                }],
                groupTypeList: [{ // 群客户类型列表
                    key: "全部客户",
                    value: false,
                }, {
                    key: "我的客户",
                    value: true,
                }],
                requestParams: {
                    isMyClient: false, // 是否是我的客户
                    pageNow: 1,
                    limit: 10,
                    maxPage: 2
                },
                groupClient: []
            }
        },
        computed: {
            groupHead () {
                return `${resRoot}/image/wxwork/group/defaultGroupImg.png?v=202007281505`
            },
            groupTypeText () {
                let groupTypeObj = this.groupTypeList.find( item => item.value === this.requestParams.isMyClient);
                return groupTypeObj && groupTypeObj.key || '全部客户'
            }
        },
        methods: {
            setGroupType (type) {
                this.resetParams();
                this.requestParams.isMyClient = type;
                this.getGroupClientList().then(list => {
                    this.groupClient = list;
                });
            },
            resetParams () {
                this.requestParams = {
                    isMyClient: false,
                    pageNow: 1,
                    limit: 10,
                    maxPage: 2
                }
            },
            /**
            * 上拉加载更多。
            * @author enson
            * @date 2020/4/10
            * */
            loadBottom() {
                if (this.requestParams.maxPage <= this.requestParams.pageNow) {
                    return
                }
                this.loading = true;
                this.requestParams.pageNow++;
                this.getGroupClientList().then(list => {
                    this.loading = false;
                    this.groupClient = this.groupClient.concat(list);
                })
            },
            /**
             * @description 根据不同的客户类型获取对应的样式
             * @author enson
             * @date 2021-01-27
             */
            getTypeClass (item) {
                if (item.type === 1) return;
                switch (item.externalType) {
                    case 1: // 微信
                        return 'greenColor'
                        break;
                    case 2: // 企业微信
                        return 'yellowColor'
                        break;
                    default: // 其他
                        return 'buleColor'
                        break;
                }
            },
            /**
             * @description 查看公告
             * @author enson
             * @date 2021-01-27
             */
            showMsg () {
                Vue.$messagebox({
                    title: '群公告',
                    message: `
                        <div class="groupCenter-groupMsg">
                            ${Ts_util.encodeHtml(this.notice) || '暂无群公告'}
                        </div>
                    `,
                    showCancelButton: false
                });
            },
            /**
             * @description 打开客户详情页
             * @author enson
             * @date 2021-01-27
             */
            seeDetails (item) {
                Mt_Util.openUserProfile(item.type, item.userId);
            },
            /**
             * @description 获取群成员列表
             * @author enson
             * @date 2021-01-28
             * @returns 
             */
            getGroupClientList () {
                return new Promise(resolve=>{
                    let parmes = Object.assign({},this.requestParams, {chatId: this.groupId})
                    Mt_Util.post('/rest/manage/wxwork/chatMember/getChatMemberList', parmes).then(res => {
                        if (res.data && res.data.success) {
                            let memberList = res.data.data.memberList;
                            this.requestParams.maxPage = Math.ceil(
                                res.data.total / this.requestParams.limit
                            );
                            resolve(memberList)
                        } else {
                            this.showEmpty = true;
                        }
                    })
                })
            },
            /**
             * @description 获取客户群信息
             * @author enson
             * @date 2021-01-28
             * @returns 
             */
            getGroupInfo () {
                return new Promise(resolve=>{
                    Mt_Util.post('/rest/manage/wxwork/groupChat/getGroupChatInfo', {
                        chatId: this.groupId
                    }).then(res => {
                        if (res.data && res.data.success) {
                            let {chatInfo, statInfo} = res.data.data;
                            this.ownerName = chatInfo.ownerName; // 群主名称
                            this.name = chatInfo.name; // 群名
                            this.createTimeName = chatInfo.createTimeName; // 创建时间
                            this.notice = chatInfo.notice; // 群公告
                            this.groupName = chatInfo.name; // 群名
                            for (let [key, value] of Object.entries(statInfo)) {
                                let groupDataItem = this.groupDataList.find(item => item.key === key);
                                if(groupDataItem) {
                                    this.$set(groupDataItem, 'number', value)
                                }
                            }
                            resolve(res.data.data)
                        } else {
                            this.showEmpty = true;
                        }
                    })
                })
            }
        },
        mounted () {
            wx.ready(async () => {
                this.groupId = await Mt_Util.getCurExternalChat();
                if (!this.groupId) {
                    // this.$messagebox('提示', '网络错误，请稍候重试')
                    this.showEmpty = true;
                    return;
                }
                this.getGroupInfo();
                this.getGroupClientList().then(list => {
                    this.groupClient = list;
                });
            })
        }
    });
})();

