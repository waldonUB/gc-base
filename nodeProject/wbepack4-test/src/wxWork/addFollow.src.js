let mtSelectInput = mtComponents.mtSelectInput
let mtButton = mtComponents.mtButton
let mtButtonWrapper = mtComponents.mtButtonWrapper
let mtPickerPoup = mtComponents.mtPickerPoup
let mtPcSelect = mtComponents.mtPcSelect
Mt_Util.router.addFollow = Vue.extend({
  name: 'addFollow',
  template: `
        <div class="addFollow">
            <div class="addFollowBox">
                <div class="addItem">
                    <p class="title"><span class="redStar">*</span>跟进内容</p>
                    <div class="infoContent">
                        <textarea class="remark" placeholder="请输入跟进内容" v-model="followInfo.remark" maxlength="200"></textarea>
                        <span class="titleText">{{followInfo.remark.length}}/200</span>
                    </div>
                </div>
                <div class="addItem">
                    <p class="title">预约回访</p>
                    <div class="nextFollow">
                        <div class="item" :class="followInfo.nextFollow==index?'active':''" v-for="(item,index) in nextFollowList" :key="index" @click="chooseNextTime(item.days,index)">{{item.name}}</div>
                    </div>
                    <div class="nextFollowDate" v-if="followInfo.nextFollow>0">
                        <el-date-picker
                            v-if="$parent.isPc"
                            format="yyyy-MM-dd"
                            size="mini"
                            value-format="yyyy-MM-dd"
                            v-model="followInfo.date"
                            type="date"
                            placeholder="选择日期">
                        </el-date-picker>
                        <div v-else class="inputBox" @click="showDatePicker"  :class="followInfo.date===''?'placeholder':''">
                            {{followDate}}
                            <img class="icon" :src="dateIcon">
                        </div>
                        <el-time-picker
                            v-if="$parent.isPc"
                            v-model="followInfo.time"
                            :picker-options="{
                            selectableRange: '00:00:00- 23:59:59'
                            }"
                            format="HH:mm"
                            size="mini"
                            value-format="HH:mm"
                            placeholder="选择时间">
                        </el-time-picker>
                        <div v-else class="inputBox" @click="showTimePicker" :class="followInfo.time===''?'placeholder':''" >
                            {{followTime}}
                            <img class="icon" :src="timeIcon">
                        </div>
                    </div>
                </div>
            </div>
            <mt-datetime-picker
                ref="datePicker"
                type="date"
                year-format="{value} 年"
                month-format="{value} 月"
                date-format="{value} 日"
                @touchmove.native.stop.prevent
                @confirm="changeFollowDate">
            </mt-datetime-picker>
            <mt-datetime-picker
                ref="timePicker"
                type="time"
                @touchmove.native.stop.prevent
                @confirm="changeFollowTime">
            </mt-datetime-picker>
            <mt-buttonWrapper>
                <mt-button class="cancelBtn" size="medium" type="whiteGrey" @click="cancelFollow">取消</mt-button>
                <mt-button size="medium" type="mainColor" @click="sureFollow">确定</mt-button>
            </mt-buttonWrapper>
        </div>
    `,
  data() {
    return {
      statusListPc: [
        {
          key: 1,
          value: '待跟进'
        }
      ],
      // statusList: ['待跟进', '有意向', '无意向'],//跟进状态
      // IntentionalityList: ['高', '中', '低'],//意向度
      followInfo: {
        //跟进信息
        id: 0,
        // followStatus: 3,
        // followStatusName: '无意向',
        // intention: '',
        // intentionName:'',
        visitsTime: '',
        remark: '',
        nextFollow: 1,
        date: '',
        time: '00:00'
      },
      //预约回访
      nextFollowList: [
        {
          days: 0,
          name: '暂不跟进'
        },
        {
          days: 1,
          name: '1天后'
        },
        {
          days: 3,
          name: '3天后'
        },
        {
          days: 7,
          name: '7天后'
        },
        {
          days: 15,
          name: '15天后'
        }
      ],
      // selectType: '',//选择列表（1，跟进状态；2，意向度）
      selectVisible: false, //显示选择弹窗
      // selectValue: '',//选择的值
      selectList: [], //选择列表
      changeTime: false, //记录是否选择了时间（因为做了改动的话返回要提醒）
      defaultIndex: '' //选择器默认选中的值
    }
  },
  created() {
    document.body.scrollTop = 0
    this.followInfo.id = this.$route.query.id
    //时间默认选择当前
    this.followInfo.date = Ts_util.format
      .formatDate(Ts_util.format.addDate(new Date(), 1, 'days'))
      .split(' ')[0]
    this.followInfo.time = Ts_util.format
      .formatDate(Ts_util.format.addDate(new Date(), 1, 'days'))
      .split(' ')[1]
      .substring(0, 5)
  },
  methods: {
    /**
     * 初始化弹窗选择内容
     * @author guoyijie
     * @date 2020/8/13
     */
    showSelectPoup(type) {
      // let selectList = type == 1 ? this.statusList : this.IntentionalityList;
      // this.defaultIndex = type == 1 ? 2 : 0;//跟进状态默认“无意向”，意向度默认第一个
      // this.selectList = [{
      //     flex: 1,
      //     values: selectList,
      //     className: 'slot1',
      //     textAlign: 'center',
      //     defaultIndex: this.defaultIndex
      // }],
      // this.selectType = type;
      // this.selectVisible = true;
    },
    /**
     * 改变选择的值
     * @author guoyijie
     * @date 2020/8/13
     */
    onValuesChange(picker, values) {
      // this.selectValue = values[0]
    },
    /**
     * 改变选择的值
     * @author guoyijie
     * @date 2020/8/13
     * @param {number} type - 1确定2取消
     */
    closeSelectPoup(type) {
      // if (type == 1) {
      //     this.selectValue = this.selectValue ? this.selectValue : (this.selectType == 1 ? this.statusList[this.defaultIndex]:this.IntentionalityList[this.defaultIndex]);
      //     if(this.selectType == 1){
      //         this.followInfo.followStatus = this.statusList.indexOf(this.selectValue) + 1;
      //         this.followInfo.followStatusName = this.selectValue;
      //     } else{
      //         this.followInfo.intention = this.IntentionalityList.indexOf(this.selectValue)+1;
      //         this.followInfo.intentionName = this.selectValue;
      //     }
      // }
      // this.selectVisible = false;
    },
    /**
     * 选择预约回访时间，暂不跟进不显示时间选择组件，选择其他时间选择完时间组件的内容自动变化
     * @author guoyijie
     * @date 2020/8/13
     * @param {number} type - 1确定2取消
     */
    chooseNextTime(days, index) {
      this.followInfo.nextFollow = index
      this.changeTime = true
      if (days !== 0) {
        this.followInfo.date = Ts_util.format
          .formatDate(Ts_util.format.addDate(new Date(), days, 'days'))
          .split(' ')[0]
        this.followInfo.time = Ts_util.format
          .formatDate(Ts_util.format.addDate(new Date(), 1, 'days'))
          .split(' ')[1]
          .substring(0, 5)
      } else {
        this.followInfo.date = ''
        this.followInfo.time = ''
      }
    },
    /**
     * 选择跟进日期
     * @author guoyijie
     * @date 2020/8/13
     */
    changeFollowDate(value) {
      this.changeTime = true
      this.followInfo.date = Ts_util.format.formatDate(value).split(' ')[0]
    },
    /**
     * 选择跟进时间
     * @author guoyijie
     * @date 2020/8/13
     */
    changeFollowTime(value) {
      this.changeTime = true
      this.followInfo.time = value
    },
    /**
     * 显示日期组件
     * @author guoyijie
     * @date 2020/8/13
     */
    showDatePicker() {
      this.$refs['datePicker'].open()
    },
    /**
     * 显示时间组件
     * @author guoyijie
     * @date 2020/8/13
     */
    showTimePicker() {
      this.$refs['timePicker'].open()
    },
    /**
     * 取消跟进，判断内容有改变时做提醒
     * @author guoyijie
     * @date 2020/8/13
     */
    cancelFollow() {
      if (this.followInfo.remark || this.changeTime) {
        this.$messagebox
          .confirm('', {
            title: '提醒',
            message: '是否暂时舍弃已填写的跟进内容',
            confirmButtonText: '确定',
            cancelButtonText: '取消'
          })
          .then(() => {
            window.history.go(-1)
          })
      } else {
        window.history.go(-1)
      }
    },
    /**
     * 确定提交跟进记录
     * @author guoyijie
     * @date 2020/8/13
     */
    sureFollow() {
      console.log(this.followInfo)
      if (!this.followInfo.remark) {
        this.$messagebox('提示', '您还未输入跟进内容')
        return
      }
      // else if (this.followInfo.followStatus == 2 && this.followInfo.intention == 0) {
      //     this.$messagebox('提示', '意向度不能为空')
      //     return
      // }
      this.followInfo.visitsTime = this.followInfo.date
        ? this.followInfo.date + ' ' + this.followInfo.time + ':00'
        : ''
      Mt_Util.post('/ajax/client/tsClientVisits_h.jsp?cmd=addTsClientVisits', this.followInfo).then(
        (res) => {
          if (res.data && res.data.success) {
            window.history.go(-1)
            this.$parent.initFollowList()
            this.$parent.getCustomInfo()
          } else if (res.data && res.data.rt === 6004) {
            //版本提醒弹窗
            this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
          } else {
            this.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
          }
        }
      )
    }
  },
  components: {
    mtSelectInput,
    mtButton,
    mtButtonWrapper,
    mtPickerPoup,
    mtPcSelect
  },
  computed: {
    dateIcon() {
      return `${resRoot}/image/wxwork/common/dateIcon.png`
    },
    timeIcon() {
      return `${resRoot}/image/wxwork/common/timeIcon.png`
    },
    followDate() {
      return this.followInfo.date ? this.followInfo.date : '请输入跟进日期'
    },
    followTime() {
      return this.followInfo.time ? this.followInfo.time : '请输入跟进时间'
    }
  }
})
