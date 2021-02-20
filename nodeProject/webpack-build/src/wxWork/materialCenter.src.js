// 素材库
(function () {
    let mtSlider = mtComponents.mtSlider
    let mtInput = mtComponents.mtInput
    let mtButton = mtComponents.mtButton
    let mtCollapseItem = mtComponents.mtCollapseItem
    let mtBottomLine = mtComponents.mtBottomLine
    let mtStTip = mtComponents.mtStTip
    let mtTabbar = mtComponents.mtTabbar
    let mtNothing = mtComponents.mtNothing
    let mtSearch = mtComponents.mtSearch
    new Vue({
        el: '#materialCenter',
        components: {
            mtSlider,
            mtInput,
            mtButton,
            mtCollapseItem,
            mtBottomLine,
            mtStTip,
            mtNothing,
            mtTabbar,
            mtSearch
        },
        data() {
            return {
                selectTab:'chatCenter',
                requestParam: {
                    name: ''
                },
                navSliderVal: 1,
                navSliderArray: [{
                        id: 1,
                        name: '话术库'
                    },
                    {
                        id: 2,
                        name: '图片库'
                    },
                    {
                        id: 3,
                        name: '文件库'
                    }
                ],
                normalSliderVal: 1,
                normalSliderArray: [{
                        id: 1,
                        name: '企业'
                    },
                    {
                        id: 2,
                        name: '个人'
                    }
                ],
                groupTagList: [], // 分组列表
                currentMaterialList: [], // 当前打开的素材列表
                groupId: '', // 当前分组的id
                IMG_SIZE: '!160x160', // 略缩图格式，接口不返回，直接在前端拼
                checkStatus: {
                    gfwCheck: true, // false则显示审查信息
                    msg: "",
                    msg2: "",
                    blogUrl: "",
                    needBlog: false
                },
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
                    this.normalSliderArray = [{
                        id: 1,
                        name: '企业'
                    }]
                } else {
                    this.normalSliderArray = [{
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
                this.getGroupTagList() 
                this.getCommonMaterialList()
            }
        },
        computed: {
            /**
             * 是否付费版本,为0就是有权限，不然就升级版本
             * @author waldon
             * @date 2020-06-05
             * @returns {boolean}
             */
            isProfVer() {
                return initTsParam.isPower
            },
            /**
             * 针对情况隐藏版本提示， -23未登录的时候不显示
             * @author waldon
             * @date 2020-06-08
             * @returns 
             */
            hideProfPage() {
                return initTsParam.isPower === -23
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
                return this.checkStatus.gfwCheck ? "" : "isShowClose";
            },
            /**
             * 审查样式
             * @author waldon
             * @date 2020/5/27
             * @returns {*}
             */
            isShowCloseTips() {
                return !this.checkStatus.gfwCheck ? "showToptips" : ""
            },
            /**
             * 分为个人和企业，对应不同页面
             * 1.企业话术 2.企业图片 3.企业文件 5.个人话术 6.个人图片
             * @author waldon
             * @date 2020/4/10
             * @returns {number} 不同页签对应的groupType
             * */
            groupTypeCal() {
                if (this.normalSliderVal === 1) { // 企业
                    return this.navSliderVal
                } else {
                    return this.navSliderVal + this.normalSliderVal + 2
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
                if (flag) { // 移动端直接打开就行，会默认使用自带的浏览器
                    window.open(this.checkStatus.blogUrl)
                } else { // pc
                    // 在默认浏览器打开redirect_uri，并附加code参数；也可以直接指定要打开的url，此时不会附带上code参数。
                    wx.invoke('openDefaultBrowser', {
                        'url': this.checkStatus.blogUrlPc,
                    }, (res) => {
                        if (res.err_msg != "openDefaultBrowser:ok") {
                            this.$messagebox('提示', res.err_msg || '网络错误')
                        }
                    });
                }
            },
            /**
             * 根据文件名判断文件类型获取icon
             * @author waldon
             * @date 2020/4/10
             * @param {*} fileName - 文件名
             * @returns {*} 文件图标
             */
            getFileIcon(fileName) {
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
                        default:
                            return resRoot + '/image/wxwork/material/icon_file.png'
                    }
                }
                return resRoot + '/image/wxwork/material/icon_file.png'
            },
            /**
             * 从素材库发送消息
             * @author waldon
             * @date 2020/4/10
             * @param {Object} rowData - 当前行的数据
             * */
            sendMessage(rowData) {
                console.log('sendMessage', rowData);
                let size = rowData.size / 1024 / 1024
                let params = {}
                if (this.groupTypeCal === 1 || this.groupTypeCal === 5) { // 话术
                    params = {
                        msgtype: 'text',
                        text: {
                            content: rowData.content, // 文本内容
                        }
                    }
                    this.sendChatMessage(params)
                    this.getMediaId(rowData) // 话术也需要调这个接口来统计使用次数
                    Mt_Util.FdpLog('yx_fxwj', {
                        yx_staff_position: initTsParam.isUpperAdm ? 1 : 2, // 员工职务 1-管理员 2-销售员 4-未知
                        yx_free_text_0: '话术'
                    })
                } else { // 查询临时素材
                    let eventName = '';
                    if((this.groupTypeCal === 2 || this.groupTypeCal === 6)&&size > 2){
                        this.$messagebox('提示', '该图片内存超出企业微信显示（2M），无法发送给好友')
                        return
                    } else if (this.groupTypeCal === 3 && size > 20) {
                        this.$messagebox('提示', '该文件内存超出企业微信显示（20M），无法发送给好友')
                        return
                    }else{
                        this.getMediaId(rowData).then(mediaId => {
                            if (this.groupTypeCal === 2 || this.groupTypeCal === 6) { // 图片
                                params = {
                                    msgtype: 'image', // 消息类型，必填
                                    image: {
                                        mediaid: mediaId, // 图片的素材id
                                    }
                                }
                                eventName = '图片';
                            }
                            if (this.groupTypeCal === 3) { // 文件

                                params = {
                                    msgtype: 'file', // 消息类型，必填
                                    file: {
                                        mediaid: mediaId, // 文件的素材id
                                    }
                                }
                                eventName = '文档';
                            }
                            eventName = '文档';
                       
                            this.sendChatMessage(params)
                            Mt_Util.FdpLog('yx_fxwj', {
                                yx_staff_position: initTsParam.isUpperAdm ? 1 : 2, // 员工职务 1-管理员 2-销售员 4-未知
                                yx_free_text_0: eventName
                            })
                         })
                    }
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
                    id: rowData.id, // 素材id
                }
                return new Promise(resolve => {
                    Mt_Util.post('/ajax/wxWork/material/tsMaterial_h.jsp?cmd=getMediaId', params).then(res => {
                        if (res.data && res.data.success) {
                            resolve(res.data.data)
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
                    if (wxRes.err_msg == 'sendChatMessage:ok') {
                        console.log(`发送成功`)
                    } else {
                        Mt_Util.getCheckInfo().then(res => {
                            if (res && res.rt === 48002) { // 应用范围不可见
                                this.$messagebox({
                                    title: '提示',
                                    message: '未设置可调用应用，无法正常使用，请按教程重新进行设置',
                                    confirmButtonText: '查看教程'
                                }).then(() => {
                                    if (Mt_Util.getTemp()) {
                                        window.open(Mt_Util.getUrlParams().noCheckApplication)
                                    } else {
                                        // 在默认浏览器打开redirect_uri，并附加code参数；也可以直接指定要打开的url，此时不会附带上code参数。
                                        wx.invoke('openDefaultBrowser', {
                                            'url': Mt_Util.getUrlParams().noCheckApplication
                                        }, (res) => {
                                            if (res.err_msg != "openDefaultBrowser:ok") {
                                                this.$messagebox('提示', res.err_msg || '网络错误')
                                            }
                                        });
                                    }
                                })
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
             * */
            getCurrentMaterialList(groupData) {
                if (groupData.list && groupData.list.length > 0) {
                    return groupData.list
                } else {
                    return this.currentMaterialList
                }
            },
            /**
             * 按名称查询搜索结果
             * @author waldon
             * @date 2020/4/10
             */
            getMaterialListByName() {
                if (!this.requestParam.name) {
                    this.getGroupTagList()
                    this.getCommonMaterialList()
                    return
                }
                let params = {
                    typeGroup: this.groupTypeCal,
                    name: this.requestParam.name,
                }
                Mt_Util.post('/ajax/wxWork/material/tsMaterial_h.jsp?cmd=getGroupMaterialList', params).then((res) => {
                    if (res.data && res.data.success) {
                        res.data.data.forEach(item => {
                            item.isSearch = true
                        })
                        this.groupTagList = res.data.data
                    } else if (res.data && res.data.rt !== 6040) {
                        this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                    }
                });
            },
            /**
             * 拼接图片地址略缩图
             * @author waldon
             * @date 2020/4/10
             * */
            getMiniImgUrl(url) {
                if (url && url.includes('.')) {
                    return url.split('.').map((item, index) => {
                        if (index === 0) {
                            return item
                        }
                        if (index === url.split('.').length - 1) {
                            return this.IMG_SIZE + '.' + item
                        } else {
                            return '.' + item
                        }
                    }).join('')
                }
                return ''
            },
            /**
             * 获取当前页签对应的分组列表
             * @author waldon
             * @date 2020/4/10
             * */
            getGroupTagList() {
                let params = {
                    type: this.groupTypeCal,
                }
                Mt_Util.post('/ajax/comm/tsGroup_h.jsp?cmd=getTsGroupList', params).then((res) => {
                    if (res.data && res.data.success) {
                        res.data.data.forEach(item => {
                            item.isOpen = false
                        })
                        res.data.data.unshift({
                            id: -1,
                            name: '常用',
                            isOpen: true
                        })
                        res.data.data.push({
                            id: 0,
                            name: '未分组',
                            isOpen: false
                        })
                        this.groupTagList = res.data.data
                    } else {
                        this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                    }
                });
            },
            /**
             * 获取常用的素材
             * @author waldon
             * @date 2020/4/10
             * */
            getCommonMaterialList() {
                this.currentMaterialList = []
                let params = {
                    typeGroup: this.groupTypeCal,
                }
                Mt_Util.post('/ajax/wxWork/material/tsMaterial_h.jsp?cmd=getCommonMaterialList', params).then((res) => {
                    if (res.data && res.data.success) {
                        this.currentMaterialList = res.data.data
                    } else if (res.data && res.data.rt === 6040) {
                        this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                    } else {
                        this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                    }
                });
            },
            /**
             * 根据分组查询素材
             * @author waldon
             * @date 2020/4/10
             * @param {*} isOpen - 是否开启分组
             * @param {*} groupId - 分组id
             */
            getMaterialByGroup(isOpen, groupId) {
                this.groupId = groupId
                this.groupTagList.forEach(item => {
                    item.isOpen = false
                })
                if (!isOpen) {
                    return
                }
                if (this.groupId === -1) { // 获取常用素材
                    this.getCommonMaterialList()
                    return
                }
                this.currentMaterialList = []
                let params = {
                    typeGroup: this.groupTypeCal,
                    groupId: this.groupId,
                    from: 2 // 判断来源 1.pc 2.企微
                }
                Mt_Util.post('/ajax/wxWork/material/tsMaterial_h.jsp?cmd=getTsWxWorkMaterialList', params).then((res) => {
                    if (res.data && res.data.success) {
                        this.currentMaterialList = res.data.data
                    } else if (res.data && res.data.rt !== 6040) {
                        this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                    }
                });
            },
            /**
             * 获取审查信息
             * @author waldon
             * @date 2020/5/27
             */
            prepareCheck() {
                Mt_Util.post("/ajax/wxWork/material/tsMaterial_h.jsp?cmd=prepareCheck").then(res => {
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
                    wx.invoke('openDefaultBrowser', {
                        'url': this.blogUrl
                    }, (res) => {
                        if (res.err_msg != "openDefaultBrowser:ok") {
                            this.$messagebox('提示', res.err_msg || '网络错误')
                        }
                    });
                }
            }
        },
        created() {
            let corpKey = Ts_util.getUrlParam(document.URL, 'corpKey') ?Ts_util.getUrlParam(document.URL, 'corpKey').split('#')[0]:''
            corpKey ? Ts_util.navigate('/wxwork/indexCenter.jsp?' + 'corpKey=' + corpKey + '#/chatCenter') : Ts_util.navigate('/wxwork/indexCenter.jsp?#/chatCenter')
            Mt_Util.initWxConfig()
            if (!this.isProfVer) {
                return
            }
            this.getGroupTagList()
            this.getCommonMaterialList()
            this.prepareCheck()
        }
    })
}())
