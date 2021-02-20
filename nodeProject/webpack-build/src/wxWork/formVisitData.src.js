(function () {
    let mtHeader = mtComponents.mtHeader
    let mtTag = mtComponents.mtTag
    let mtFold = mtComponents.mtFold
    let mtNothing = mtComponents.mtNothing
    Mt_Util.router.formVisitData = Vue.extend({
        name: "formVisitData",
        template: `
        <div class="formData">
            <mt-header :title="title"></mt-header>
            <div class="dataInfoBox">
                <div class="titleBox">
                    <mt-tag class="status" :type="status==0?'':'unSelected'" :tagText="statusName"></mt-tag>
                    <p class="title">{{title}}</p>
                </div>
                <p class="viewer"><span class="viewerNum">{{commitTotal}}</span>人已提交</p>
            </div>
            <mt-loadmore v-if="formDataList.length>0"  v-infinite-scroll="loadBottom" ref="loadmore">
                <div class="viewerCard" v-for="item in formDataList" :key="item.id">
                    <div class="viewerInfoBox">
                        <img class="headImg" :src="item.wxHeadImgUrl">
                        <div class="viewerInfo">
                            <div class="nameInfo">
                                <span class="name">{{item.wxName}}</span>
                                <span class="remarks" v-if="item.wxMobile">({{item.wxMobile}})</span>
                            </div>
                            <div class="dateTime">{{item.createTimeName}}</div>
                        </div>
                    </div>
                    <div class="sourceInfo">
                        <div class="quality">{{item.isQuality==1?'优质':'普通'}}</div>
                        <div class="nodeName">{{item.nodeName}}</div>
                        <div class="fromViewerNameBox">通过</div>
                        <div class="personShare" v-if="item.fromViewerName">
                            「<div class="nameText">{{item.fromViewerName}}</div>」
                            <div class="shareLabel">分享</div>
                        </div>
                        <div>{{item.sourceName}}访问</div>
                    </div>
                    <div class="table" v-if="item.isMore">
                        <div class="tr" v-for="(i, index) in item.formData" :key="index">
                            <div class="td td-header">{{i.name}}</div>
                            <div class="td">{{i.data}}</div>
                        </div>
                    </div>
                    <mt-fold openText="查看填写明细" closeText="收起" @fold="showTable(item)"></mt-fold>
                </div>
            </mt-loadmore>
            <mt-nothing v-else emptyTips="表单数据空空如也~"></mt-nothing>
        </div>
    `,
        data() {
            return {
                formDataList: [],
                otherCheckOption: {
                    pageNow: 1,
                    limit: 10,
                    maxPage: 2
                },
                templateId:0,//表单id
                statusName:'',//状态名（已发布，未发布）
                status:0,
                title:'',
                commitTotal:0,
                isMoreLoading:false
            }
        },
        components: {
            mtHeader,
            mtTag, 
            mtFold,
            mtNothing
        },
        created(){
            document.body.scrollTop = 0
            this.templateId = this.$route.query.id;
            this.getTsFormDataList().then(list=>{
                this.formDataList = [].concat(list)
            })
        },
        methods: {  
            /**
            * 上拉加载
            * @author guoyijie
            * @date 2020/8/13
            */
            loadBottom(){
                if (this.otherCheckOption.maxPage <= this.otherCheckOption.pageNow) {
                    return
                }
                this.isMoreLoading = true
                this.otherCheckOption.pageNow++
                this.getTsFormDataList().then(list => {
                    this.isMoreLoading=false
                    this.formDataList = this.formDataList.concat(list)
                })
            },
            /**
             * 查看填写明细
             * @author guoyijie
             * @date 2020/8/13
             * @param {Object} item 一条数据对象
             */
            showTable(item) {
                item.isMore = !item.isMore;
                if (item.formData.length === 0) {
                    this.getTsFormDataDetail(item).then(formData => {
                        let index = this.formDataList.findIndex(formItem => {
                            item.id == formItem.id
                        })
                        item.formData = formData;
                        this.$set(this.formDataList, index, item)
                    })
                }
            },
            /**
             * 获取表格数据
             * @author guoyijie
             * @date 2020/8/13
             * @param {Object} item 
             */
            getTsFormDataDetail(item) {
                return new Promise(resolve=>{
                    Mt_Util.post('/ajax/wxWork/form/tsForm_h.jsp?cmd=getTsFormDataDetail', item).then(res => {
                        if (res.data && res.data.success) {
                            resolve(res.data.data)
                        } else {
                            this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                        }
                    })
                })
            },
            /**
             * 获取表单访客数据
             * @author guoyijie
             * @date 2020/8/13
             * @param {Object} item 
             */
            getTsFormDataList() {
                return new Promise(resolve=>{
                    let parmes = Object.assign({},
                        this.otherCheckOption, {
                            templateId: this.templateId
                        }
                    )
                    Mt_Util.post('/ajax/wxWork/form/tsForm_h.jsp?cmd=getTsFormDataList', parmes).then(res => {
                        if (res.data && res.data.success) {
                            const {
                                formList,
                                statusName,
                                status,
                                title,
                                commitTotal
                            } = res.data.data;
                            this.statusName = statusName;
                            this.status = status;
                            this.title = title;
                            this.commitTotal = commitTotal;
                            this.otherCheckOption.maxPage = Math.ceil(
                                res.data.total / this.otherCheckOption.limit
                            );
                            formList.forEach(item => {
                                item.isMore = false;
                                item.formData = []
                            })
                            resolve(formList)
                        } else {
                            this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                        }
                    })
                })
            }
        },
    });
})()