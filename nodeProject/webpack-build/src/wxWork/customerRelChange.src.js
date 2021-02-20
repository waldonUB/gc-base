/*
 * @Author: waldon 
 * @Date: 2020-05-15 15:21:04 
 * @Last Modified by: waldon
 * @Last Modified time: 2020-06-05 11:00:11
 */

(function () {
    let mtTag = mtComponents.mtTag
    let mtButton = mtComponents.mtButton
    new Vue({
        el: '#customerRelChange',
        components: {
            mtButton,
            mtTag,
        },
        data: {
            customerInfo: {
                staffName: '',
                clientName: '',
                corpName: '',
                corpTagList: '',
                headImg: '',
                mobileList: '',
                personTagList: '',
                remark: '',
                stateStr: '',
                timeStr: '',
                type: '',
            }, // 客户信息
            scrollTipClass: '',
            isOem: initTsParam.isOem,
            isDelete: false // 是否删除了用户
        },
        watch: {
        },
        computed: {
            /**
             * 提示的icon
             * @author waldon
             * @date 2020/5/17
             * */
            normalTip () {
                return resRoot + `/image/wxwork/common/normalTip.png?v=20191124212203`
            },
            timeLabelCal () {
                if (this.customerInfo.type === 0) {
                    return '添加时间'
                } else if (this.customerInfo.type === 1) {
                    return '删除时间'
                } else {
                    return '被删时间'
                }
            }
        },
        methods: {
            getCustomerInfo () {
                return new Promise(resolve => {
                    let params = {
                        wxWorkTicket: Ts_util.getUrlParam(document.URL, 'wxWorkTicket'),
                        time: Ts_util.getUrlParam(document.URL, 'time'),
                        type: Ts_util.getUrlParam(document.URL, 'type')
                    }
                    Mt_Util.post('/guest/tsWxWork_h.jsp?cmd=getCorpChangeRecordDetail', params).then(res => {
                        if (res.data && res.data.success) {
                            resolve(res.data.data)
                        } else if (res.data && !res.data.success && res.data.rt === -3) {
                            resolve(res.data.data)
                            this.isDelete = true
                        } else {
                            this.$messagebox('提示', res.data.msg || '获取信息失败')
                        }
                    })
                })
            },
            callByBrowser (mobile) {
                let flag = false
                if (navigator) {
                    const devices = ['Android', 'iPhone']
                    for (let item of devices) {
                        if (navigator.userAgent.includes(item)) {
                            flag = true
                        }
                    }
                }
                if (flag) { // 是移动端就打电话
                    window.location.href = "tel:" + mobile
                } else {
                    var input = document.createElement('input');
                    document.body.appendChild(input);
                    input.setAttribute('value', mobile);
                    input.select();
                    if (document.execCommand('copy')) {
                        this.$toast({
                            message: '复制成功',
                            position: 'bottom',
                            duration: 3000
                          })
                    } else {
                        this.$messagebox('提示', '当前浏览器不支持，请手动复制')
                    }
                    document.body.removeChild(input);
                }
            },
        },
        created() {
            this.getCustomerInfo().then(res => {
                this.customerInfo = res
                this.$nextTick(() => {
                    if ((this.$refs.tipContent.offsetWidth / this.$refs.tipBox.offsetWidth) > 0.88) {
                        this.scrollTipClass = 'scrollTip'
                    } else {
                        this.scrollTipClass = ''
                    }
                })
            })
        }
    })
})()