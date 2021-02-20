(function () {
let mtSlider = mtComponents.mtSlider
let mtSearch = mtComponents.mtSearch
let mtSubClassify = mtComponents.mtSubClassify
let mtItemOfList = mtComponents.mtItemOfList
let mtButton = mtComponents.mtButton
let mtNothing = mtComponents.mtNothing
Mt_Util.router.marketCenter = Vue.extend({
    name: "marketCenter",
    template: `
        <div class="marketCenter">
            <div v-if="!isShowChild">
                <mt-nothing v-if="showEmptyCal" :emptyTips="emptyTips">
                    <div class="operateBox">
                        <mt-button v-if="showEmptyBtnCal" size="small" type="mainColor" @click="toVisitBlog">去了解</mt-button>
                    </div>
                </mt-nothing>
                <!--2021年1月13 waldon modify 调换v-if和v-else的位置-->
                <div v-else>
                    <div class="topPart">
                        <mt-slider
                            class="navSlider"
                            slider-type="navTop"
                            :slider-val.sync="navSliderVal"
                            :slider-array="navSliderArray">
                        </mt-slider>
                        <mt-slider
                            class="articleSlider"
                            v-if="navSliderVal==0"
                            :slider-val.sync="articleSliderVal"
                            :slider-array="slideComputedList">
                        </mt-slider>
                        <mt-search class="searchBox" :limitSpace="true" @search="getArticleListByTitle" :maxlength="30"></mt-search>
                        <mt-subClassify class="subClassify" v-if="isShowSubClassify" :classifyList="articleClassifyList[articleSliderVal]" :activeType="checkOption.type" @chooseClassify="getArticleListByType"></mt-subClassify>
                    </div>
                    <mt-loadmore v-if="marketList.length>0"  v-infinite-scroll="loadBottom" ref="loadmore">
                        <mt-itemOfList @preview="preview(item)" v-for="item in marketList" :key="item.id" :item="item">
                            <div class="buttonBox">
                                <mt-button v-if="navSliderVal==0" class="previewBtn" size="small" type="whiteGrey" @click.stop="preview(item)">预览</mt-button>
                                <mt-button v-else class="previewBtn" size="small" type="whiteGrey" @click.stop="toFormData(item)">数据</mt-button>
                                <mt-button size="small" type="mainColor" @click.stop="send(item)">发送</mt-button>
                            </div>
                        </mt-itemOfList>
                        <p v-show="isMoreLoading" class="page-infinite-loading">
                            <mt-spinner type="fading-circle"></mt-spinner>
                            <span class="loadingText">加载中...</span>
                        </p>
                    </mt-loadmore>
                    <mt-nothing :noPadding="true" v-else :emptyTips="navSliderVal==0?'暂无文章':'表单空空如也~'"></mt-nothing>
                </div>
            </div>
            <router-view v-else></router-view>
        </div>
    `,
    data(){
        return{
            isShowChild:false,//是否显示子组件
            navSliderVal:0,
            navSliderArray: [{
                    id: 0,
                    name: '文章中心'
                },
                {
                    id: 1,
                    name: '企业表单'
                },
            ],
            articleSliderVal:0,
            articleSliderArray: [{
                    id: 0,
                    name: '已分享文章'
                },
                {
                    id: 1,
                    name: '产品素材'
                },
                {
                    id: 2,
                    name: '行业热文'
                },
                {
                    id: 3,
                    name: '企业文库'
                }
            ],
            articleClassifyList:[],//文章分类显示
            slideComputedList:[],
            isLoadedClassify:false,//是否加载完初始化接口
            otherCheckOption:{
                pageNow: 1,
                limit: 10,
                maxPage: 2
            },
            checkOption: {
                title:'',
                type: -1,
                fatherId: 1,
                typeId: 0, // 因为企业文库中type已经存在了，所以分类查询的时候，必须手动设typeId的值
            },
            ajaxUrl: [
                "/ajax/wxWork/article/tsArticle_h.jsp?cmd=getArticleList", //文章中心
                "/ajax/article/tsArticleLibrary_h.jsp?cmd=getTsArticleLibraryList", //素材
                "/ajax/wxWork/article/tsArticleTemplate_h.jsp?cmd=getArticleTemplateList" ,//企业文库
                "/ajax/wxWork/form/tsForm_h.jsp?cmd=getTsEntForm"//获取表单列表
            ],
            isShowPArticle:false,//是否显示产品素材
            isShowHArticle:false,//是否显示行业热文
            industryTypeList:[],//行业热文分类
            productTypeList:[],//产品素材分类
            templateTypeList:[],//企业文库分类
            marketList:[],//文章和表单list
            isMoreLoading:false, //是否上拉加载
            hasFuncPermission: true, // 是否有显示该功能的权限
        }
    },
    components:{
        mtSlider,
        mtSearch,
        mtSubClassify,
        mtItemOfList,
        mtButton,
        mtNothing
    },
    computed:{
        /**
         * 是否显示缺省页
         * @author waldon
         * @date 2021/1/13
         * @returns {Boolean} - 是否显示缺省页
         */
        showEmptyCal () {
            return !this.isProfVer || !this.hasFuncPermission
        },
        /**
         * 是否显示缺省页按钮
         * @author waldon
         * @date 2021/1/13
         * @returns {Boolean} - 是否显示缺省页按钮
         */
        showEmptyBtnCal () {
            return this.hasFuncPermission
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
         * 是否显示分类
         * @author guoyijie
         * @date 2020-08-19
         * @returns {boolean}
         */
        isShowSubClassify(){
            return this.navSliderVal == 0 && this.articleSliderVal!=0
        },
        /**
         * 是否分销
         * @author guoyijie
         * @date 2020-08-19
         * @returns {boolean} 是否分销
         * */
        isOem() {
            return initTsParam.isOem
        },
        /**
         * 缺省文案
         * @author guoyijie
         * @date 2020-08-19
         * @returns {string}
         * */
        emptyTips(){
            if (!this.isProfVer) {
                return '当前版本不支持该功能，请升级版本'
            } else if (!this.hasFuncPermission) {
                return '暂无获客工具和客户管理权限，请联系管理员开启'
            }
            return ''
        },
    },
    async created(){
        this.isShowChild = this.$route.path.match(/\w+/gi).length >= 2;
        if (!this.isProfVer) { // 如果没有版本就不执行后面的逻辑
            return
        }
        let staffOption = {
            isRoleAuth: true,
            func: 'marketCenter',
        }
        this.hasFuncPermission = await Mt_Util.getStaffInfo(staffOption)
        if (!this.hasFuncPermission) { // 如果没有权限直接显示缺省页
            return
        }
        Mt_Util.FdpLog('yx_cblyxgj') // 侧边栏营销工具曝光
        this.getTsArticleRouterInfo().then(()=>{
            classifyList = [...this.articleSliderArray]
            if (!this.isShowPArticle) {
                classifyList = classifyList.filter(item => item.id !== 1)
            }
            if (!this.isShowHArticle) {
                classifyList = classifyList.filter(item => item.id !== 2)
            }
            this.slideComputedList = classifyList;
            this.getMarketInfo().then(info=>{
                this.marketList = [].concat(info)
            })
        })
    },
    watch:{
        articleSliderVal(newVal) {
            this.getArticleListByTitle('')
        },
        navSliderVal(newVal){
            this.articleSliderVal=0;
            this.getArticleListByTitle('')
        },
        $route(to, from) {
            this.isShowChild = this.$route.path.match(/\w+/gi).length >= 2;
        }
    },
    methods: {
        /**
         * 跳转到升级页
         * @author waldon
         * @date 2020-06-05
         */
        toVisitBlog() {
            if (Mt_Util.getTemp()) {
                window.open(Mt_Util.getUrlParams().noProfVer)
            } else {
                // 在默认浏览器打开redirect_uri，并附加code参数；也可以直接指定要打开的url，此时不会附带上code参数。
                wx.invoke('openDefaultBrowser', {
                    'url': Mt_Util.getUrlParams().noProfVer
                }, (res) => {
                    if (res.err_msg != "openDefaultBrowser:ok") {
                        this.$messagebox('提示', res.err_msg || '网络错误')
                    }
                });
            }
        },
        /**
        * 初始化数据
        * @author guoyijie
        * @date 2020-08-19
        * */
        initData(){
            this.marketList=[];
            this.checkOption.fatherId=this.articleSliderVal;
            this.otherCheckOption.pageNow=1;
        },
        /**
        * 上拉加载
        * @author guoyijie
        * @date 2020-08-19
        * */
        loadBottom() {
            if (this.otherCheckOption.maxPage <= this.otherCheckOption.pageNow) {
                return
            }
            this.isMoreLoading = true
            this.otherCheckOption.pageNow++
            this.getMarketInfo().then(info => {
                this.isMoreLoading = false  
                this.marketList = this.marketList.concat(info)
            })
        },
        /**
        * 通过标题搜索
        * @author guoyijie
        * @date 2020-08-19
        * @param {string} title标题
        * */
        getArticleListByTitle(title) {
            this.initData()
            if (this.articleSliderVal!==0){
                this.articleClassifyList[this.articleSliderVal] ?this.checkOption.type = this.articleClassifyList[this.articleSliderVal][0].id:-1;
            }
            this.checkOption.title = title;
            this.getMarketInfo().then(info => {
                this.marketList = [].concat(info)
            })
        },
        /**
         * 通过分类搜索
         * @author guoyijie
         * @date 2020-08-19
         * @param {number} 分类id
         * */
        getArticleListByType(id){
            this.initData()
            this.checkOption.type=id;
            this.getMarketInfo().then(info => {
                this.marketList = [].concat(info)
            })
        },
        /**
         * 点击发送 调用生成接口
         * @author guoyijie
         * @date 2020/8/13
         * @param {object} 一条数据
         * */
        send(item){
            let ajaxUrl='';
            let parems={}
            if(this.navSliderVal==0){
                parems = {
                    articleId: item.id,
                    productAttribute: item.productAttribute
                }
                ajaxUrl = '/ajax/wxWork/article/tsArticle_h.jsp?cmd=getArticle'
                
            }else{
                parems = {
                    formId: item.id
                }
                ajaxUrl = '/ajax/wxWork/form/tsForm_h.jsp?cmd=getFormInfo'
            }
            Mt_Util.post(ajaxUrl, parems).then(res => {
                if (res.data && res.data.success) {
                    let info = res.data.data;
                    this.sendMessage(info.url, info.coverTitle, info.coverImgUrl, info.coverContent)
                } else if (res.data && res.data.rt !== 6052) {
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
                    link: url, //H5消息页面url 必填
                    title: title, //H5消息标题
                    desc: content,
                    imgUrl: img, //H5消息封面图片URL
                }
            }
            Mt_Util.sendChatMessage(params)
        },
        /**
         * 点击预览
         * @author guoyijie
         * @date 2020/8/13
         * */
        preview(item){
            this.$router.push({
                name: 'preview',
                query: {
                    item: item,
                    navSliderVal:this.navSliderVal                }
            })
        },
        /**
         * 点击数据
         * @author guoyijie
         * @date 2020/8/13
         * */
        toFormData(item){
            this.$router.push({
                name: 'formVisitData',
                query: {
                    id: item.id,
                    title: item.title
                }
            })
        },
        /**
        * 获取文章显示分类的初始化信息
        * @author guoyijie
        * @date 2020/8/13
        * */
        getTsArticleRouterInfo(){
            return new Promise(resolve=>{
                Mt_Util.post('/ajax/wxWork/article/tsArticle_h.jsp?cmd=getTsArticleRouterInfo').then(res => {
                    if (res.data && res.data.success) {
                        let routerInfo = res.data.data;
                        this.isShowPArticle = routerInfo.showProductRouter;
                        this.isShowHArticle = routerInfo.showIndustryRouter;
                        this.industryTypeList = [{
                            id: -1,
                            name: '全部'
                        }];
                        for (let item of routerInfo.industryTypeList){
                            this.industryTypeList.push({
                                id:item.id,
                                name:item.name
                            })
                        }
                        this.productTypeList = [{
                            id:-1,
                            name:'全部'
                        }];
                        for (let item of routerInfo.productTypeList) {
                            this.productTypeList.push({
                                id: item.id,
                                name: item.name
                            })
                        }
                        this.templateTypeList = [{
                            id: -1,
                            name: '全部'
                        }];
                        for (let item of routerInfo.templateTypeList) {
                            this.templateTypeList.push({
                                id: item.id,
                                name: item.name
                            })
                        }
                        this.articleClassifyList=[[],this.productTypeList,this.industryTypeList,this.templateTypeList]
                        resolve()
                    } else if (res.data && res.data.rt !== 6052) {
                        this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                    }
                })
            })
        },
        /**
         * 获取列表
         * @author guoyijie
         * @date 2020/8/13
         * */
        getMarketInfo() {
            return new Promise(resolve => {
                let actionUrl=''
                if (this.navSliderVal == 0) {
                    switch (this.articleSliderVal) {
                        case 0:
                            actionUrl = this.ajaxUrl[0];
                            break;
                        case 1:
                            actionUrl = this.ajaxUrl[1];
                            break;
                        case 2:
                            actionUrl = this.ajaxUrl[1];
                            break;
                        case 3:
                            this.checkOption.typeId = this.checkOption.type // 企业文库中已有type字段，所以用typeId表示分类
                            actionUrl = this.ajaxUrl[2];
                            break;
                    }
                }else{
                    actionUrl = this.ajaxUrl[3];
                }
                let data = Object.assign({},
                    this.checkOption,
                    this.otherCheckOption
                );
                Mt_Util.post(actionUrl, data).then(res => {
                    if (res.data && res.data.success) {
                        this.otherCheckOption.maxPage = Math.ceil(res.data.total / this.otherCheckOption.limit);
                        let info = this.navSliderVal == 0 ? res.data.data : res.data.data.list;
                        resolve(info)
                    } else {
                        this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                    }
                })
            })
        },
    },
});
})()