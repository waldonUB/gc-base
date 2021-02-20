(function () {
    let mtButton = mtComponents.mtButton
    let mtButtonWrapper = mtComponents.mtButtonWrapper
    Mt_Util.router.addTag = Vue.extend({
        name: "addTag",
        template: `
        <div class="addTag">
            <div class="addTagBox">
                <p class="title">企业标签</p>
                <div v-for="item in allTagList" :key="item.id">
                    <p class="tagTitle">{{item.name}}</p>
                    <div class="tagList">
                        <mtButton size="small" class="tag" v-for="subItem in item.tag" :key="subItem.id" :type="getTagTypeClass(item, subItem)" @click="changeTag(subItem)">{{subItem.name}}</mtButton>    
                    </div>
                </div>
            </div>
            <mt-buttonWrapper>
                <mt-button class="cancelBtn" size="medium" type="whiteGrey" @click="cancelFollow">取消</mt-button>
                <mt-button size="medium" type="mainColor" @click="sureTag">确定</mt-button>
            </mt-buttonWrapper>
        </div>
    `,
        data() {
            return {
                allTagList:[],//所有显示标签
                selectedTagList:[],//选中标签
                customId:0,//客户id
                type:1
            }
        },
        components: {
            mtButton,
            mtButtonWrapper
        },
        created(){
            this.selectedTagList = this.$route.query.selectedTagList;
            console.log(this.selectedTagList)
            this.customId = this.$route.query.id;
            this.type = this.$route.query.type;
            this.getTagList()
        },
        methods: {
            /**
             * 获取标签组的数据集合
             * @author waldon
             * @date 2020/8/5
             */
            getGroupWithTagList() {
                let selectedGroupWithTagList = []
                this.selectedTagList.forEach(item => {
                    let group = {
                        id: item.groupId,
                        name: item.groupName,
                        tag: [item]
                    }
                    let findGroup = selectedGroupWithTagList.find(subItem => subItem.id === item.groupId)
                    if (findGroup) {
                        findGroup.tag.push(item)
                    } else {
                        selectedGroupWithTagList.push(group)
                    }
                })
                return selectedGroupWithTagList;
            },
            /**
             * 取消返回上一页
             * @author guoyijie
             * @date 2020/8/13
             */
            cancelFollow() {
                window.history.go(-1);
            },
            
            /**
             * 确认
             * @author guoyijie
             * @date 2020/8/13
             */
            sureTag() {
                if (this.type===1){
                    var params = {
                        id: this.customId,
                        labelIdJson: JSON.stringify(this.selectedTagList)
                    };
                    Mt_Util.post('/ajax/client/tsClient_h.jsp?cmd=setTsClientTagRelList', params).then((res) => {
                        if (res.data && res.data.success) {
                            this.$parent.getCustomInfo()
                            window.history.go(-1);
                        } else {
                            this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                        }
                    });
                }else{
                    this.$parent.selectedTagList = this.selectedTagList;
                    let tagList = [];
                    for (let item of this.selectedTagList) {
                        tagList.push(item.name)
                    }
                    this.$parent.tagList = tagList;
                    window.history.go(-1);
                }
            },
            /**
             * 获取标签列表
             * @author guoyijie
             * @date 2020/8/13
             */
            getTagList(){
                let parmes={
                    type: 0,
                    isGetAll: true
                }
                Mt_Util.post('/ajax/wxWork/tag/tsTag_h.jsp?cmd=getCorpTagList', parmes).then(res => {
                    if (res.data && res.data.success) {
                        this.allTagList = res.data.data;
                    } else {
                        this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                    }
                })
            },
            /**
             * 计算选中样式
             * @author guoyijie
             * @date 2020/8/13
             */
            getTagTypeClass(group, tag) {
                let index = this.selectedTagList.findIndex(item => {
                    return item.groupId === group.id && item.name === tag.name
                })
                return index > -1 ? 'mainColor' : 'unSelected'
            },
            /**
             * 选中标签插入列表
             * @author guoyijie
             * @date 2020/8/13
             */
            changeTag(tag) {
                let initLength = this.selectedTagList.length
                this.selectedTagList = this.selectedTagList.filter(item => item.id !== tag.id)
                if (initLength === 0 || initLength === this.selectedTagList.length) {
                    this.selectedTagList.push(Object.assign({}, tag))
                }
            },
        },
    });
})()