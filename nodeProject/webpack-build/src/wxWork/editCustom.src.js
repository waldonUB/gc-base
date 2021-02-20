(function () {
    let mtButton = mtComponents.mtButton
    let mtButtonWrapper = mtComponents.mtButtonWrapper
    let mtFormGap = mtComponents.mtFormGap
    let mtSelectInput = mtComponents.mtSelectInput
    let mtInput = mtComponents.mtInput
    let mtRadio = mtComponents.mtRadio
    let mtArea = mtComponents.mtArea
    let mtTag = mtComponents.mtTag
    let mtPcSelect = mtComponents.mtPcSelect
    let mtMore = mtComponents.mtMore
    let editFidle={
        template:`
            <div v-if="item.unable===0">
                <mt-input v-if="item.fieldType==1" :label="item.name" :placeholder="'请输入'+item.name" :attr="{ maxlength: 1000 }" v-model="item.value"></mt-input>
                <mt-input v-if="item.fieldType==2" type="textarea" :label="item.name" :placeholder="'请输入'+item.name" :attr="{ maxlength: 1000 }"  :rows="5" v-model="item.value"></mt-input>
                <mt-pc-select :title="item.name" v-if="isPc&&item.fieldType==3">
                    <el-date-picker
                        v-model="item.value"
                        format="yyyy-MM-dd HH:mm:ss"
                        value-format="yyyy-MM-dd HH:mm:ss"
                        type="datetime"
                        @focus="noScroll"
                        @blur="reScroll"
                        placeholder="选择日期时间">
                    </el-date-picker>
                </mt-pc-select>
                <mt-selectInput v-else-if="item.fieldType==3" :title="item.name" :selectText="item.valuesName" @select="showTimePoup"></mt-selectInput>
                <mt-input v-if="item.fieldType==4" limitInput="decimal" :label="item.name" :placeholder="'请输入'+item.name" :attr="{ maxlength: 1000 }" v-model="item.value"></mt-input>
                <mt-pc-select :title="item.name" v-if="isPc&&item.fieldType==5">
                    <el-select v-model="item.value" placeholder="请选择" @visible-change="visibleChange">
                        <el-option
                        v-for="optionItem in item.optionList"
                        :key="optionItem.id"
                        :label="optionItem.name"
                        :value="optionItem.id">
                        </el-option>
                    </el-select>
                </mt-pc-select>
                <mt-selectInput v-else-if="item.fieldType==5" :title="item.name" :selectText="item.valuesName" @select="showSelectPoup"></mt-selectInput>
                <mt-pc-select :title="item.name" v-if="isPc&&item.fieldType==6">
                    <el-select v-model="item.value" multiple placeholder="请选择"  @visible-change="visibleChange">
                        <el-option
                            v-for="optionItem in item.optionList"
                            :key="optionItem.id"
                            :label="optionItem.name"
                            :value="optionItem.id">
                        </el-option>
                    </el-select>
                </mt-pc-select>
                <mt-selectInput v-else-if="item.fieldType==6" :title="item.name" :selectText="item.valuesName" @select="toCheckBox"></mt-selectInput>
            </div>
        `,
        props:{
            item:{
                type:Object,
                default:()=>{
                    return {}
                }
            },
            isPc:{
                type:Boolean,
                default:false
            },
        },
        components:{
            mtPcSelect,
            mtInput,
            mtSelectInput
        },
        methods:{
            showTimePoup(){
                this.$emit('showTime')
            },
            showSelectPoup(){
                this.$emit('showSelect')
            },
            toCheckBox(){
                this.$emit('toCheckBox')
            },
            visibleChange(value){
                this.$emit('changeScroll', !value)
            },
            noScroll(){
                this.$emit('changeScroll',false)
            },
            reScroll(){
               this.$emit('changeScroll', true)
            }
        }
    }
    Mt_Util.router.editCustom = Vue.extend({
        name: "editCustom",
        template: `
        <div class="editCustom">
            <div v-if="!isShowChild">
                <div class="editBox">
                    <div>
                        <mt-formGap :titleIcon="infoIcon" title="个人信息"></mt-formGap>
                        <mt-input 
                            :isNeed="true"
                            label="姓名" 
                            placeholder="请输入姓名" 
                            :attr="{ maxlength: 10 }" 
                            v-model="customInfo.contacts">
                        </mt-input>
                        <mt-input 
                            label="昵称" 
                            placeholder="" 
                            :attr="{ maxlength: 10 }"
                            :disabled="true"
                            class="disabled"
                            v-model="customInfo.wxName">
                        </mt-input>
                        <mt-input 
                            :isNeed="initMobile"
                            label="手机" 
                            type="tel" 
                            limitInput="tel" 
                            :disabled="initMobile"
                            :class="initMobile?'disabled':''"
                            :attr="{ maxlength: 11 }" 
                            placeholder="请输入手机" 
                            v-model="customInfo.mobile">
                        </mt-input>
                        <mt-selectInput 
                            title="标签" 
                            placeholder="请输入标签" 
                            :hasSlot="true"
                            >
                            <div class="tagBox">
                                <mt-tag :tagText="item.tag_name" type="personTag" class="tagItem" v-for="(item,index) in personTagList" :key="'p_'+index"></mt-tag>
                                <mt-tag :tagText="item" class="tagItem" v-for="(item,index) in tagList" :key="'c_'+index"></mt-tag>
                                <mt-button type="mainColor" class="tagBtn" @click="toAddTag" size="mini">+打标签</mt-button>
                            </div>
                        </mt-selectInput>
                        <mt-selectInput 
                            v-if="systemFieldAbleConf.sex"
                            title="性别" 
                            placeholder="请输入性别" 
                            v-model="customInfo.sex" 
                            :hasSlot="true">
                            <mt-radio :radioList="sexList" :checked="customInfo.sex" @change="changeSex"></mt-radio>
                        </mt-selectInput>
                        <edit-fidle 
                            v-for="(item,index) in personFieldsList" 
                            :key="item.id" 
                            :item="item" 
                            :isPc="$parent.isPc"
                            :index="index"
                            groupType="person"
                            @changeScroll="changeScroll"
                            @showTime = "showTimePoup(index,'person')"
                            @showSelect = "showSelectPoup(2,item.value,item.optionList,index,'person')"
                            @toCheckBox = "toCheckBox(2,item.value,item.optionList,index,'person')"
                        >
                        </edit-fidle>
                        <mt-pc-select title="生日" v-if="$parent.isPc&&systemFieldAbleConf.birthday">
                            <el-date-picker
                                format="yyyy-MM-dd"
                                value-format="yyyy-MM-dd"
                                v-model="customInfo.birthday"
                                type="date"
                                @focus="changeScroll(false)"
                                @blur="changeScroll(true)"
                                placeholder="选择日期">
                            </el-date-picker>
                        </mt-pc-select>
                        <mt-selectInput 
                            v-else-if="systemFieldAbleConf.birthday" 
                            title="生日" 
                            :selectText="customInfo.birthdayStr" 
                            @select="showBirthPoup">
                        </mt-selectInput>
                        <mt-input
                            v-if="systemFieldAbleConf.wx" 
                            label="微信" 
                            placeholder="请输入微信" 
                            :attr="{ maxlength: 25 }" 
                            v-model="customInfo.wx">
                        </mt-input>
                        <mt-input 
                            v-if="systemFieldAbleConf.qq" 
                            label="QQ" 
                            placeholder="请输入QQ" 
                            type="tel"
                            limitInput="number" 
                            :attr="{ maxlength: 25 }" 
                            v-model="customInfo.qq">
                        </mt-input>
                        <mt-input 
                            v-if="systemFieldAbleConf.idCard" 
                            label="证件号" 
                            limitInput="idCard" 
                            placeholder="请输入证件号" 
                            :attr="{ maxlength: 25 }" 
                            v-model="customInfo.idCard">
                        </mt-input>
                    </div>
                    <div v-if="isShowOtherInfo">
                        <mt-formGap :titleIcon="companyIcon" title="其他信息"></mt-formGap>
                        <mt-input 
                            v-if="systemFieldAbleConf.corpName" 
                            label="企业" 
                            placeholder="请输入企业" 
                            :attr="{ maxlength: 25 }" 
                            v-model="customInfo.corpName">
                        </mt-input>
                        <mt-pc-select title="行业" v-if="$parent.isPc&&systemFieldAbleConf.industry">
                            <el-select v-model="customInfo.industry" placeholder="请选择" @visible-change="visibleChange">
                                <el-option
                                v-for="item in indusTryPcList"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key">
                                </el-option>
                            </el-select>
                        </mt-pc-select>
                        <mt-selectInput 
                            v-else-if="systemFieldAbleConf.industry"    
                            title="行业" 
                            :selectText="customInfo.industryName" 
                            @select="showSelectPoup(1, customInfo.industryName,indusTryList,-1)">
                        </mt-selectInput>  
                        <mt-input 
                            v-if="systemFieldAbleConf.position"  
                            label="职位" 
                            placeholder="请输入职位" 
                            :attr="{ maxlength: 25 }" 
                            v-model="customInfo.position">
                        </mt-input>
                        <mt-pc-select title="获客方式" v-if="$parent.isPc">
                            <el-select v-model="customInfo.customersWay" placeholder="请选择" @visible-change="visibleChange">
                                <el-option
                                v-for="item in customersWayPcList"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key">
                                </el-option>
                            </el-select>
                        </mt-pc-select>
                        <mt-selectInput 
                            v-else-if="systemFieldAbleConf.customersWay"    
                            title="获客方式" 
                            :selectText="customInfo.customersWayName" 
                            @select="showSelectPoup(3, customInfo.customersWayName,customersWayList,-1)">
                        </mt-selectInput>  
                        <mt-pc-select title="区域" v-if="$parent.isPc&&systemFieldAbleConf.area">
                            <fa-cascader
                                v-model="regionNamePc"
                                :fieldNames="cascaderProps"
                                class="regionSelect"
                                @change="changeArea"
                                @visible-change="visibleChange"
                                placeholder="不限地区"
                                :options="addressDefList"
                                filterable
                                :change-on-select="true">
                            </fa-cascader>
                        </mt-pc-select>
                        <mt-selectInput 
                            v-else-if="systemFieldAbleConf.area" 
                            title="区域" 
                            :selectText="regionName" 
                            @select="showAreaPoup">
                        </mt-selectInput>
                        <mt-input 
                            v-if="systemFieldAbleConf.address"  
                            label="地址" 
                            placeholder="请输入地址" 
                            :attr="{ maxlength: 50 }"
                            v-model="customInfo.address">
                        </mt-input>
                        <mt-input 
                            v-if="systemFieldAbleConf.remark"  
                            type="textarea" 
                            label="备注" 
                            placeholder="请输入备注" 
                            :attr="{ maxlength: 100 }"  
                            :rows="5" v-model="customInfo.remark">
                        </mt-input>
                        <edit-fidle 
                            v-for="(item,index) in otherFieldsList" 
                            :key="item.id" 
                            :item="item" 
                            :isPc="$parent.isPc"
                            :index="index"
                            groupType="other"
                            @changeScroll="changeScroll"
                            @showTime = "showTimePoup(index,'other')"
                            @showSelect = "showSelectPoup(2,item.value,item.optionList,index,'other')"
                            @toCheckBox = "toCheckBox(2,item.value,item.optionList,index,'other')"
                        >
                        </edit-fidle>
                    </div>
                    <div v-if="!isAssist">
                        <mt-formGap :titleIcon="qiweiIcon" title="企微信息"></mt-formGap>
                        <mt-input 
                            label="备注名" 
                            placeholder="请输入备注名" 
                            :attr="{ maxlength: 25 }" 
                            v-model="remarkInfo.remarkName">
                        </mt-input>
                        <mt-input 
                            label="备注企业" 
                            placeholder="请输入备注企业" 
                            :attr="{ maxlength: 25 }" 
                            v-model="remarkInfo.remarkCorpName">
                        </mt-input>
                        <mt-input 
                            v-for="(item,index) in remarkInfo.mobileList"
                            :label="index==0?'备注手机':' '" 
                            limitInput="tel" 
                            :attr="{ maxlength: 40 }" 
                            placeholder="请输入备注手机" 
                            v-model="item.value">
                        </mt-input>
                        <mt-input 
                            type="textarea" 
                            v-model="remarkInfo.remarkDescription"
                            label="备注描述" 
                            placeholder="请输入备注描述" 
                            :attr="{ maxlength: 150 }">
                        </mt-input>
                    </div>
                    <div v-if="isEditAssist">
                        <mt-formGap :titleIcon="followIcon" title="销售信息"></mt-formGap>
                        <div class="assit" @click="toAssist">
                            <div class="fist-box">协助人</div>
                            <div class="assist-name">
                                {{ assistNames }}
                            </div>
                            <img :src="getImgAddress('/common/arrow.png')" class="arrow" />
                        </div>
                    </div>
                </div>
                <mt-buttonWrapper>
                    <mt-button class="cancelBtn" size="medium" type="whiteGrey" @click="cancelEdit">取消</mt-button>
                    <mt-button size="medium" type="mainColor" @click="sureEdit">确定</mt-button>
                </mt-buttonWrapper>
                <mt-datetime-picker
                    ref="datePicker"
                    type="date"
                    v-model="dateVal"
                    :startDate="startDate"
                    year-format="{value} 年"
                    month-format="{value} 月"
                    date-format="{value} 日"
                    @touchmove.native.stop.prevent
                    @confirm="changeBirthDate">
                </mt-datetime-picker>
                <mt-datetime-picker
                    ref="timePicker"
                    class="timePicker"
                    v-model="dateTimeVal"
                    type="datetime"
                    :startDate="startDate"
                    year-format="{value} 年"
                    month-format="{value} 月"
                    date-format="{value} 日"
                    hourFormat-format="{value} 时"
                    minuteFormat-format="{value} 分"
                    secondFormat-second="{value} 秒"
                    @touchmove.native.stop.prevent
                    @confirm="changeTime">
                </mt-datetime-picker>
                <mt-popup
                    v-model="regionVisible"
                    class="pickerBox"
                    @touchmove.native.stop.prevent
                    position="bottom">
                    <div class="buttonBox"><div @click="regionCancel">取消</div><div @click="regionSure">确定</div></div>
                    <mt-picker class="pickerContent" :slots="myAddressSlots" showToolbar valueKey="name" @change="addressChange"></mt-picker>
                </mt-popup>
                <mt-popup
                    v-model="selectVisible"
                    class="pickerBox"
                    @touchmove.native.stop.prevent
                    position="bottom">
                    <div class="buttonBox"><div @click="closeSelectPoup(2)">取消</div><div @click="closeSelectPoup(1)">确定</div></div>
                    <mt-picker class="pickerContent" :slots="selectList" @change="onValuesChange"></mt-picker>
                </mt-popup>
            </div>
            <router-view v-else></router-view>
        </div>
    `,
        data() {
            return {
                assistNames: '',
                isShowChild:false,
                groupType:'',//person个人信息、other其他信息
                customInfo:{
                    id:'',
                    contacts:'',
                    wxName:'',
                    sex:1,
                    mobile:'',
                    dataSourceName:'',
                    birthdayStr: '',
                    birthday:'',
                    wx:'',
                    qq:'',
                    idCard:'',
                    industry:0,
                    industryName:'',
                    customersWay: 0,
                    customersWayName: '',
                    corpName:'',
                    position:'',
                    source:'',
                    sourceName:'',
                    province:'',
                    city:'',
                    address:'',
                    remark:'',
                    sid: ''
                },
                clientData: {
                    indusTryList: [], // 行业
                    customersWayList: [], // 来源
                    tsLabelList: [], // 标签
                    tsStaffList: [], // 员工
                },
                remarkInfo:{
                    remarkCorpName: '',
                    remarkName:'',
                    remarkMobiles:[],
                    mobileList:[{value:''},{value:''},{value:''},{value:''},{value:''}],
                    remarkDescription:''
                },
                regionVisible:false,
                sexList: [{
                        key: 1,
                        value: '男'
                    },
                    {
                        key: 2,
                        value: '女'
                    },
                ],
                //标签列表
                tagList: [],
                personTagList: [],
                clientTagList: [],
                selectedTagList:[],
                selectVisible:false,
                selectValue:'',
                indusTryList:[],//行业列表
                indusTryPcList:[],//pc用的行业列表
                customersWayList: [],//获客方式
                customersWayPcList: [],//pc用的获客方式列表
                addressDefList: [], //地址列表
                selectList:[],//弹窗显示选择列表
                cities:[],
                provinceList:[],
                citiesArr:[],
                areaArr:[],
                regionNamePc:[],
                cascaderProps: { // 级联字段定义
                    value: 'name',
                    label: 'name',
                    children: 'subList',
                },
                myAddressSlots: [ //省
                    {
                        flex: 1,
                        values: [], //省份数组
                        className: 'slot1',
                        textAlign: 'center'
                    },
                    //分隔符
                    {
                        divider: true,
                        content: '-',
                        className: 'slot2'
                    },
                    //市
                    {
                        flex: 1,
                        values: [],
                        className: 'slot3',
                        textAlign: 'center'
                    },
                    {
                        divider: true,
                        content: '-',
                        className: 'slot4'
                    },
                    //县
                    {
                        flex: 1,
                        values: [],
                        className: 'slot5',
                        textAlign: 'center'
                    }
                ],
                creatorInfo: {}, // 创建人对应的销售员，用于判断是否能选择销售员
                regionInit:false,//是否完成地址初始化
                startDate:new Date('1920-01-01'),//生日组件最小日期
                dateVal: new Date('1990-01-01'),//默认选中日期
                dateTimeVal: new Date(), //默认选中日期
                currentSelectIndex:-1,//当前在选中的项
                personFieldsList: [], //个人信息自定义
                otherFieldsList: [], //其他信息自定义
                isShowOtherInfo:false,//是否显示其他信息
                systemFieldAbleConf:{},//系统字段是否开启
                isScroll:false,
                initMobile:false,
                customerId: "", // 判断是否编辑态
                fromAdd: false,//是否来自添加协助人页面
                isEditAssist: true, //是否可以编辑协助人
                isAssist: false, // 是否是协助人
            }
        },
        components: {
            mtButton,
            mtButtonWrapper,
            mtFormGap,
            mtInput,
            mtSelectInput,
            mtArea,
            mtRadio,
            mtPcSelect,
            editFidle,
            mtTag,
            mtMore
        },
        computed:{
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
            regionName(){
                return this.customInfo.province+this.customInfo.city//区域：省+市
            }
        },
        created(){
            this.isShowChild = this.$route.path.match(/\w+/gi).length >= 3;
            document.body.scrollTop = 0
            this.externalUserId = this.$route.query.externalUserId;
            this.getCustomInfo().then(res=>{
                this.initTsClient()
            })
        },
        watch:{
             //监听路有变化
             $route(to, from) {
                 this.isShowChild = this.$route.path.match(/\w+/gi).length >= 3;
             }
        },
        activated() {
            this.customInfo.assistSidList = timeInfo.state.fromAdd?timeInfo.state.tempSidArr:this.customInfo.assistSidList
            this.assistNames = timeInfo.state.fromAdd?timeInfo.state.assistNames:this.assistNames
        },
        methods: {
            /**
             * 跳转到设置协助人
             * @author han
             * @date 2021-01-25
             */
            toAssist() {
                let arr = timeInfo.state.tempSidArr.length && timeInfo.state.fromAdd?[...timeInfo.state.tempSidArr]:[...this.customInfo.assistSidList]
                debugger
                timeInfo.commit("setSidArr", arr);
                timeInfo.commit("setDepIdArr", []);
                console.log('不会没有把。。。。', arr);
                this.$router.push({
                    name: 'addAssist'
                })
            },
            //获取图片
            getImgAddress(url) {
               return `${resRoot}/image/wxwork${url}?v=202012211024`;
            },
            /**
            * 添加标签
            * @author guoyijie
            * @date 2020/8/13
            */
            toAddTag() {
                console.log(this.selectedTagList)
                this.$router.push({
                    name: 'editTag',
                    query: {
                        selectedTagList: this.selectedTagList,
                        id: this.customerId,
                        type:2
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
                    list.forEach(item => {
                        if (Array.isArray(item.tag)) {
                            item.tag.forEach(subItem => {
                                arr.push(subItem)
                            })
                        }
                    })
                }
                return arr;
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
            visibleChange(value){
                this.changeScroll(!value)
            },
            changeScroll(isScroll){
                var mo = function (e) {
                    e.preventDefault()
                }
                if (isScroll){
                    document.body.style.overflow = ''// 出现滚动条
                }else{
                    document.body.style.overflow = 'hidden'
                }
            },
            changeArea(regionNamePc) {
                console.log(regionNamePc)
                this.customInfo.province = regionNamePc[0]||'';
                this.customInfo.city = regionNamePc[1]||'';
                this.customInfo.address = regionNamePc[2]||''
            },
            /**
             * 地址选择变化
             * @author guoyijie
             * @date 2020/8/13
             * @param {object} picker对象
             * @param {array} 选择的值
             * */
            addressChange(picker, values) {
                // this.picker = picker;
                if (this.regionInit){
                        this.region = values[0] + '-' + values[1] + '-' + values[2];
                        picker.setSlotValues(1, this.getCitiesArr(values[0]));
                        picker.setSlotValues(2, this.getAreaArr(values[1]));
                }
            },
            /**
             * 取消地址选择
             * @author guoyijie
             * @date 2020/8/13
             * */
            regionCancel(){
                this.regionVisible=false;
            },
            /**
            * 确认地址选择
            * @author guoyijie
            * @date 2020/8/13
            * */
            regionSure(){
                this.customInfo.province = this.region.split('-')[0]
                this.customInfo.city = this.region.split('-')[1]
                this.customInfo.address = this.region.split('-')[2]
                this.regionVisible = false;
            },
            /**
             * 获取客户信息
             * @author guoyijie
             * @date 2020/8/13
             * */
            getCustomInfo() {
                return new Promise(resolve => {
                    let params = {
                        externalUserId: this.externalUserId,
                    }
                    Mt_Util.post("/rest/manage/client/getTsClientByWxWork", params).then(res => {
                        if (res.data && res.data.success) {
                            this.isEditAssist = res.data.data.isEditAssist
                            timeInfo.state.staffInfo.mysid = res.data.data.sid
                            this.hasCustomer = true;
                            let customData = res.data.data;
                            let infoKeys = Object.keys(this.customInfo);
                            infoKeys.forEach(element => {
                                if (typeof customData[element] !== 'undefined') {
                                    this.customInfo[element] = customData[element];
                                }
                            });
                            this.initMobile = !!this.customInfo.mobile;
                            this.customInfo.industry = this.customInfo.industry == 0 ? '' : this.customInfo.industry;
                            this.customInfo.customersWay = this.customInfo.customersWay == 0 ? '' : this.customInfo.customersWay;
                            this.customInfo.birthday = this.customInfo.birthday ? Ts_util.format.formatDate(customData.birthday).split(' ')[0] : this.customInfo.birthday;
                            if (this.customInfo.birthday){
                                this.dateVal = new Date(this.customInfo.birthday);
                            }
                            this.systemFieldAbleConf = customData.systemFieldAbleConf;
                            let otherKeyList = ['corpName', 'industry', 'position','customersWay', 'area', 'address','remark']
                            this.isShowOtherInfo = otherKeyList.some(item => {
                                if (this.systemFieldAbleConf[item]) {
                                    return true
                                }
                            })
                            for (let item of customData.crmFieldDataList) {
                                if (item.fieldType == 6) {
                                    let value = [];
                                    for (let optionItem of item.optionList) {
                                        if (item.value.indexOf(optionItem.id) !== -1) {
                                            value.push(optionItem.id)
                                        }
                                    }
                                    item.value = value;
                                }
                                if (item.groupId == 0) {
                                    this.personFieldsList.push(item) //个人信息
                                } else {
                                    if (item.unable === 0) {
                                        this.isShowOtherInfo = true;
                                    }
                                    this.otherFieldsList.push(item)
                                }
                            }
                            this.clientTagList = customData.clientTagList;
                            this.personTagList = customData.wxWorkRemark.personTagList;
                            this.selectedTagList = this.toTagJson(this.clientTagList)
                            this.initTagList(customData.clientTagList)//标签
                            this.customInfo.province && this.regionNamePc.push(this.customInfo.province)//没有数据push进去会显示不了缺省文案
                            this.customInfo.city && this.regionNamePc.push(this.customInfo.city)
                            this.customInfo.assistSidList = timeInfo.state.fromAdd?timeInfo.state.tempSidArr:customData.assistInfo.assistSidList
                            !timeInfo.state.sidArr.length && (timeInfo.state.sidArr = this.customInfo.assistSidList)
                            // this.customInfo.assistNames = timeInfo.state.fromAdd?timeInfo.state.assistNames:customData.assistInfo.assistNames
                            this.assistNames = timeInfo.state.fromAdd?timeInfo.state.assistNames:customData.assistInfo.assistNames
                            this.remarkInfo.remarkName = customData.wxWorkRemark.remark;
                            this.remarkInfo.remarkCorpName = customData.wxWorkRemark.remarkCorpName;
                            this.remarkInfo.remarkMobiles = customData.wxWorkRemark.mobiles;
                            this.remarkInfo.remarkMobiles && this.remarkInfo.remarkMobiles.forEach((item,index)=>{
                                this.remarkInfo.mobileList[index].value=item
                            })
                            this.remarkInfo.remarkDescription = customData.wxWorkRemark.description;
                            this.isAssist = customData.assistInfo.isAssist;
                            resolve(res.data.data)
                        } else {
                            this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                        }
                    })
                })
            },
            /**
             * 获取选择列表的初始化信息（行业列表，地址列表）由于和pc不对应地址先不处理默认选中项，后面优化
             * @author guoyijie
             * @date 2020/8/13
             * */
            initTsClient(){
                return new Promise(resolve => {
                    Mt_Util.post('/ajax/wxWork/client/tsClient_h.jsp?cmd=initTsClient').then(res => {
                        if (res.data && res.data.success) {
                            let info = res.data.data;
                            this.clientData = res.data.data;
                            this.indusTryList=[];
                            this.indusTryPcList = info.indusTryList;
                            for(let item of info.indusTryList){
                                this.indusTryList.push(item.value)
                            }
                            this.customersWayList = [];
                            this.customersWayPcList = info.customersWay;
                            if (info.customersWay) {
                                for (let item of info.customersWay) {
                                    this.customersWayList.push(item.value)
                                }
                            }
                            this.addressDefList = info.addressDefList;
                            this.provinceList = this.getProvincesArr();
                            let province = '广东省'
                            // let provinceDefault = this.customInfo.province ? this.provinceList.indexOf(province) : 0;
                            this.citiesArr = this.getCitiesArr(province);
                            let city = '广州市'
                            // let cityDefault = city ? this.citiesArr.indexOf(city) : 0;
                            this.areaArr = this.getAreaArr(city)
                            this.myAddressSlots=
                                [ //省
                                    {
                                        flex: 1,
                                        values: this.provinceList, //省份数组
                                        className: 'slot1',
                                        textAlign: 'center'
                                    },
                                    //分隔符
                                    {
                                        divider: true,
                                        content: '-',
                                        className: 'slot2'
                                    },
                                    //市
                                    {
                                        flex: 1,
                                        values: this.citiesArr,
                                        className: 'slot3',
                                        textAlign: 'center'
                                    },
                                    {
                                        divider: true,
                                        content: '-',
                                        className: 'slot4'
                                    },
                                    //县
                                    {
                                        flex: 1,
                                        values: this.areaArr,
                                        className: 'slot5',
                                        textAlign: 'center'
                                    }
                                ]
                            this.regionInit=true
                            resolve(res.data.data)
                        } else {
                            this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                        }
                    })
                })
            },
            /**
             * 获取省列表
             * @author guoyijie
             * @date 2020/8/13
             * */
            getProvincesArr() {
                let provincesArr = [];
                this.addressDefList.forEach(item => {
                    provincesArr.push(item.name)
                })
                return provincesArr 
            },
            /**
             * 获取城市列表
             * @author guoyijie
             * @date 2020/8/13
             * @param {string} 省
             * */
            getCitiesArr(province) {
                let citiesArr = [];
                this.cities = this.addressDefList.find(item => {
                    return item.name == province
                })
                this.cities.subList.forEach(item => {
                    citiesArr.push(item.name)
                })
                return citiesArr;
            },
            /**
             * 获取区列表
             * @author guoyijie
             * @date 2020/8/13
             * @param {string} 城市
             * */
            getAreaArr(city) {
                let arr = this.cities.subList.find(item => {
                    return item.name == city
                })
                let areaArr=[]
                if (arr!==undefined){
                    for (let item of arr.subList) {
                        areaArr.push(item.name)
                    }
                }
                return areaArr
            },
            /**
             * 初始化选择列表
             * @author guoyijie
             * @date 2020/8/13
             * @param type{number} 1行业列表 2个人信息中的单选列表 3其他信息中的单选列表
             * @param value{string} 初始化的值,有则默认选中，无则默认选中第一个
             * @param list{array} 选择列表
             * @param index{number} 
             * @param groupType{string} 
             * */
            showSelectPoup(type,value,list,index,groupType) {
                this.groupType = groupType;
                  let valueList = []
                if (this.groupType){
                    for(let item of list){
                        valueList.push(item.name)
                    }
                }else{
                    valueList=list;
                }
                this.selectType=type;
                this.currentSelectIndex =index;
                //没选择情况下默认选中第一个
                let defaultIndex = list.indexOf(value);
                defaultIndex = defaultIndex > 0 ? defaultIndex:0
                this.selectList = [{
                    flex: 1,
                    values: valueList,
                    className: 'slot1',
                    textAlign: 'center',
                    defaultIndex: defaultIndex
                }]
                this.selectVisible=true;
            },
            toCheckBox(type, value, list, index, groupType) {   
                this.groupType = groupType;
                this.currentSelectIndex = index;
                this.selectType=type;
                this.$router.push({
                    name: 'customCheckBox',
                    query: {
                        optionList: JSON.stringify(list),
                        checkList: JSON.stringify(value)
                    }
                })
            },
            /**
             * 行业选择变化
             * @author guoyijie
             * @date 2020/8/13
             * */
            onValuesChange(picker, values) {
                console.log(values)
                this.selectValue=values[0]
            },
            /**
             * 1，确认行业选择，2取消行业选择弹窗
             * @author guoyijie
             * @date 2020/8/13
             * @param {number} 1确认 2取消
             * */
            closeSelectPoup(type) {
                if(type==1){
                    switch (this.selectType) {
                        case 1://行业
                            this.customInfo.industry = this.selectValue ?
                                this.indusTryList.indexOf(this.selectValue) + 1 :
                                (this.customInfo.industry ? this.customInfo.industry : 1);
                            this.customInfo.industryName = this.indusTryList[this.customInfo.industry - 1];
                            break;
                        case 2://自定义单选
                            let list = this.groupType=='person'?this.personFieldsList:this.otherFieldsList;
                            let obj = list[this.currentSelectIndex];
                            let optionItem = obj.optionList.find(item=>{
                                return item.name === this.selectValue;
                            })
                            obj.value = optionItem.id;
                            obj.valuesName = this.selectValue;
                            this.$set(list, this.currentSelectIndex, obj)
                            break
                        case 3://获客方式
                            this.customInfo.customersWay = this.selectValue ?
                                this.customersWayList.indexOf(this.selectValue) + 1 :
                                (this.customInfo.customersWay ? this.customInfo.customersWay : 1);
                            this.customInfo.customersWayName = this.customersWayList[this.customInfo.customersWay - 1];
                            break;
                           
                    }
                }
                this.selectVisible = false;
            },
            /**
             * 选择性别
             * @author guoyijie
             * @date 2020/8/13
             * @param {number} 1男 2女
             * */
            changeSex(key){
                this.customInfo.sex = key;
            },
            /**
             * 取消编辑
             * @author guoyijie
             * @date 2020/8/13
             * */
            cancelEdit() {
                timeInfo.commit("setDefault")
                this.$router.push({
                    name: 'customCenter',
                    query: {
                    changeTab: 2
                    }
                })
            },
            /**
            * 确认编辑
            * @author guoyijie
            * @date 2020/8/13
            * */
            sureEdit() {
                let mobileList=[];
                for (let item of this.remarkInfo.mobileList){
                    if (item !== '' && item !== undefined){
                        mobileList.push(item.value)
                    }
                }
                this.customInfo.labelIdJson = JSON.stringify(this.selectedTagList);
                this.customInfo.industry = this.customInfo.industry ? this.customInfo.industry:0;
                this.customInfo.customersWay = this.customInfo.customersWay ? this.customInfo.customersWay : 0;
                this.customInfo.crmFieldDataList = JSON.stringify(this.personFieldsList.concat(this.otherFieldsList))
                // this.customInfo.assistSidList = JSON.stringify(this.customInfo.assistSidList)
                this.customInfo.assistSidList = timeInfo.state.fromAdd? JSON.stringify(timeInfo.state.tempSidArr): JSON.stringify(this.customInfo.assistSidList)
                this.remarkInfo.remarkMobiles = JSON.stringify(mobileList);
                let parmes = Object.assign({}, this.customInfo, this.remarkInfo,{isPc:false, sid: timeInfo.state.staffInfo.mysid})
                Mt_Util.post("/ajax/client/tsClient_h.jsp?cmd=setTsClient", parmes).then(res => {
                    if (res.data && res.data.success) {
                        this.customInfo.assistSidList = JSON.parse(this.customInfo.assistSidList)
                        timeInfo.commit("setDefault")
                        // window.history.go(-1);
                        this.$router.push({
                            name: 'customCenter',
                            query: {
                                changeTab: 2
                            }
                        })
                        this.$parent.getCustomInfo()
                    } else if (res.data && res.data.rt === 6004) {
                        this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                    } else {
                        this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
                    }
                });
            },
            /**
             * 显示生日弹窗
             * @author guoyijie
             * @date 2020/8/13
             * */
            showBirthPoup(){
                this.$refs['datePicker'].open()
            },
            showTimePoup(index,groupType) {
                console.log(index, groupType)
                this.groupType = groupType;
                this.currentSelectIndex=index;
                this.$refs['timePicker'].open()
            },
            changeTime(value){
                let list = this.groupType=='person'?this.personFieldsList:this.otherFieldsList;
                let timeValue = Ts_util.format.formatDate(value)
                let obj = list[this.currentSelectIndex];
                obj.value = timeValue
                obj.valuesName = timeValue
                this.$set(list, this.currentSelectIndex, obj)
            },
             /**
             * 获取生日日期
             * @author guoyijie
             * @date 2020/8/13
             * */
            changeBirthDate(value){
                this.customInfo.birthday = Ts_util.format.formatDate(value).split(' ')[0]
                this.customInfo.birthdayStr = this.customInfo.birthday; //birthday传值，birthdayStr显示
            },
            /**
             * 显示地址选择弹窗
             * @author guoyijie
             * @date 2020/8/13
             * */
            showAreaPoup(){
                this.regionVisible=true;
            }
        },
    });
})()