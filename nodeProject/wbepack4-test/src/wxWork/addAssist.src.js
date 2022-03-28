;(function () {
  let mtSelectInput = mtComponents.mtSelectInput
  let mtButton = mtComponents.mtButton
  let mtButtonWrapper = mtComponents.mtButtonWrapper
  let mtSearchBox = mtComponents.mtSearchBox
  let mtSelectWorker = mtComponents.mtSelectWorker
  Mt_Util.router.addAssist = Vue.extend({
    name: 'addAssist',
    template: `
       <div class="addAssist"  @scroll="touchBottom">
            <mt-searchBox v-model="checkOption.staffName"></mt-searchBox>
            <mt-selectWorker
            :allcheck.sync="allcheck"
            :list="list"
            :selectType="selectType"
            :isUpdateAll.sync="isUpdateAll"
            @checkAll="checkAll"
            @checkList="checkList"
            @saveReceiver="saveReceiver"
            ></mt-selectWorker>
       </div>
    `,
    data() {
      return {
        allcheck: true,
        list: [],
        sidArr: [], // 选择了的员工sidList
        depIdArr: [], // 选择了部门的id list
        delSidArr: [], // 取消了的员工sidList
        checkOption: {
          pageNow: 1,
          limit: 20,
          maxPage: 2,
          staffName: '',
          isWorker: true,
          id: 0, // 拿部门下的员工
          isForGetAssistantList: true, // 是否为了获取可选择的协助人列表
        },
        isShowPlaceholder: true, // 是否显示搜索框的字
        selectImgList: [], // 选择的员工头像
        searchTimer: -1,
        getImgTimer: -1,
        companyName: '', // 公司名称
        isOnloading: false,
        isUpdateAll: false,
        selectType: 'getReceiver',
        allIdList: [], //搜索结果中所有员工sid的集合
        isInSearch: false,
      }
    },
    watch: {
      //筛选的情况
      'checkOption.staffName'(newValue) {
        this.isInSearch = !!this.checkOption.staffName
        console.log(newValue)
        this.isSelecting = this.checkOption.staffName != '' //搜索词不为空的时候表示当前处于搜索中的状态
        this.checkOption.pageNow = 1
        this.checkOption.maxPage = 1
        this.checkOption.id = 0
        clearTimeout(this.searchTimer)
        this.searchTimer = setTimeout(() => {
          this.getDepartmentList(this.isInSearch).then((companyList) => {
            this.list = []
            companyList.forEach((item) => {
              this.list.push(item)
            })
            this.allcheck = this.list.every((item) => {
              return item.checkStatus == 2
            })
            console.log(this.allcheck)
          })
        }, 300)
      },
    },
    created() {
      if (this.$route.query.id == '1') {
        this.$router.replace({
          name: 'setAssist',
        })
        return
      }
      this.isOnloading = true
      this.sidArr = timeInfo.state.sidArr.slice()
      this.depIdArr = timeInfo.state.depIdArr.slice()
      this.delSidArr = timeInfo.state.delSidArr.slice()
      timeInfo.commit('setTempDelSidArr', this.delSidArr)
      timeInfo.commit('setTempDepIdArr', this.depIdArr)
      timeInfo.commit('setTempSidArr', this.sidArr)
      this.loadList(true).then(() => {
        this.checkIsAll()
      })
    },
    mounted() {
      if (!this.isOnloading) {
        this.selectType = 'selectReceiver'
        this.sidArr = timeInfo.state.tempSidArr
        this.delSidArr = timeInfo.state.tempDelSidArr
        this.depIdArr = timeInfo.state.tempDepIdArr
        this.isUpdateAll = true
        this.checkList()
      }
      this.isOnloading = false
    },
    methods: {
      /**
       * 是否触底
       * @author han
       * @date 2021-02-04
       */
      touchBottom(e) {
        if (e.srcElement.scrollTop + e.srcElement.offsetHeight > e.srcElement.scrollHeight - 120) {
          console.log('触底！！！')
          if (this.checkOption.maxPage > this.checkOption.pageNow) {
            this.checkOption.pageNow++
            this.loadList().then(() => {
              this.checkIsAll()
            })
          }
        }
      },
      //全选操作
      async checkAll(isClick = true) {
        this.sidArr = timeInfo.state.tempSidArr
        this.delSidArr = timeInfo.state.tempDelSidArr
        this.depIdArr = timeInfo.state.tempDepIdArr
        this.allcheck = !this.allcheck
        if (this.isInSearch) {
          if (this.allcheck) {
            this.list.forEach((item) => {
              item.checkStatus = 2
            })
            this.sidArr = [...new Set([...this.sidArr, ...this.allIdList])]
          } else {
            this.list.forEach((item) => {
              item.checkStatus = 0
            })
            this.sidArr = this.sidArr.filter((item) => {
              return this.allIdList.indexOf(item) === -1
            })
          }
        } else {
          if (this.allcheck) {
            this.list.forEach((item) => {
              item.checkStatus = 2
            })
            await this.getDepartmentInfo([this.checkOption.id]).then((data) => {
              let sidList = data.sidList || []
              let depIdList = data.depIdList || []
              this.sidArr = [...new Set([...this.sidArr, ...sidList])]
              this.depIdArr = [...new Set([...this.depIdArr, ...depIdList])]
            })
          } else {
            this.list.forEach((item) => {
              item.checkStatus = 0
            })
            this.sidArr = []
            this.depIdArr = []
          }
        }
        console.log(this.sidArr)
        this.selectType = 'selectReceiver'
        timeInfo.commit('setTempDelSidArr', [])
        timeInfo.commit('setTempDepIdArr', this.depIdArr)
        timeInfo.commit('setTempSidArr', this.sidArr)
        this.isUpdateAll = true
      },
      getDepartmentInfo(depIdList) {
        return new Promise((resolve) => {
          Mt_Util.post('/rest/manage/wxwork/getWxWorkDepInfo', {
            depIdList: depIdList.toString(),
          }).then((res) => {
            if (res.data.success && res.data.data) {
              resolve(res.data.data)
            } else {
              stShowMsg({ content: res.data.msg })
            }
          })
        })
      },
      saveReceiver() {
        this.$router.push({
          name: 'editCustom',
          query: {
            externalUserId: timeInfo.state.externalUserId,
          },
        })
      },
      checkIsAll() {
        this.allcheck = this.list.every((item) => {
          return item.checkStatus === 2
        })
      },
      checkList(item, index) {
        this.$set(this.list, index, item)
        this.sidArr = timeInfo.state.tempSidArr
        this.list.forEach((item) => {
          if (!item.isStaff && item.sidList.length !== 0) {
            let filterList = item.sidList.filter((sid) => {
              return this.sidArr.includes(sid)
            })
            if (filterList.length === 0) {
              item.checkStatus = 0
            } else if (filterList.length === item.sidList.length) {
              item.checkStatus = 2
            } else {
              item.checkStatus = 1
            }
          } else if (item.isStaff) {
            item.checkStatus = this.sidArr.includes(item.sid) ? 2 : 0
          }
        })
        this.checkIsAll()
      },
      getDepartmentList(isSearch = false) {
        console.log(JSON.stringify(this.sidArr))
        console.log(JSON.stringify(this.depIdArr))
        return new Promise((resolve) => {
          let sidArr = this.sidArr
          let depIdArr = timeInfo.state.tempSidArr
          let data = Object.assign(
            {
              sidList: depIdArr.toString(),
              // depIdList: depIdArr.toString(),
              depIdList: '',
              permissions: 0,
              isWorker: true,
              isForGetAssistantList: true,
            },
            this.checkOption,
          )
          Mt_Util.post('/rest/manage/wxwork/getWxWorkDepartmentList', data).then((res) => {
            if (res.data.success && res.data.data) {
              let { corpDep, departmentList } = res.data.data
              this.companyName = corpDep && corpDep.name
              this.checkOption.maxPage = Math.ceil(res.data.total / this.checkOption.limit)
              if (isSearch) {
                this.allIdList = res.data.data.allIdList
              }
              resolve(departmentList)
            } else {
              Vue.prototype.$messagebox('提示', res.data.msg || '网络错误，请稍候重试')
            }
          })
        })
      },
      loadList(isInit = false) {
        return new Promise((resolve) => {
          this.getDepartmentList().then((companyList) => {
            isInit && (this.list = [])
            companyList.forEach((item) => {
              this.list.push(item)
            })
            this.allcheck = this.list.every((item) => {
              return this.checkStatus == 2
            })
            resolve()
          })
        })
      },
    },
    components: {
      mtButtonWrapper,
      mtButton,
      mtSelectWorker,
      mtSearchBox,
    },
    computed: {},
    beforeDestroy() {
      timeInfo.state.fromAdd = true
    },
  })
})()
