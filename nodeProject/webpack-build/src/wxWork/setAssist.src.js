(function () {
  let mtButton = mtComponents.mtButton;
  let mtButtonWrapper = mtComponents.mtButtonWrapper;
  let mtSearchBox = mtComponents.mtSearchBox;
  let mtSelectWorker = mtComponents.mtSelectWorker;
  Mt_Util.router.setAssist = Vue.extend({
    name: "setAssist",
    template: `
        <div class="setAssist" @scroll="touchBottom">
            <mt-searchBox v-model="checkOption.staffName"></mt-searchBox>
            <mt-selectWorker
                :permissions="permissions"
                selectType="selectReceiver"
                :list="list"
                :allcheck.sync="allcheck"
                :isUpdateAll.sync="isUpdateAll"
                @checkList="checkList"
                @saveReceiver="saveReceiver"
                @backPage="checkParent"
            ></mt-selectWorker>
        </div>
      `,
    data() {
      return {
        allcheck: false,
        isUpdateAll: false,
        allSidArr: [], // 获取当前部门下的所有sid
        allDepIdArr: [], // 获取当前部门下的所有部门depid
        list: [],
        sidArr: [], // 选择了的员工sidList
        depIdArr: [], // 选择了部门的id list
        delSidArr: [], // 取消了的员工sidList
        checkOption: {
          pageNow: 1,
          limit: 20,
          maxPage: 2,
          id: 0, // 拿部门下的员工
          staffName: "",
          isForGetAssistantList: true, // 是否为了获取可选择的协助人列表
        },
        allIdList: [], //搜索结果中所有员工sid的集合
        isInSearch: false,
        permissions: "", // 请求权限
      };
    },
    watch: {
      list(newVal) {
        console.log("最新的值....", newVal);
      },
    },
    created() {
      this.currentInfo = timeInfo.state.currentDepartment;
      this.checkOption.id = this.currentInfo.id; //当前的部门id
      this.getDepartmentInfo([this.checkOption.id]).then((data) => {
        this.allSidArr = data.sidList;
        this.allDepIdArr = data.depIdList.filter(
          (id) => id != this.checkOption.id
        ); // 过滤掉父级部门id
      });
    },
    mounted() {
      debugger
      this.sidArr = timeInfo.state.tempSidArr;
      this.delSidArr = timeInfo.state.tempDelSidArr;
      this.depIdArr = timeInfo.state.tempDepIdArr;
      this.isUpdateAll = true;
      this.loadList(true);
      //   this.loadList(true).then(() => {
      //     this.checkIsAll();
      //   });
    },
    methods: {
      /**
       * 是否触底
       * @author han
       * @date 2021-02-04
       */
      touchBottom(e) {
        if (
          e.srcElement.scrollTop + e.srcElement.offsetHeight >
          e.srcElement.scrollHeight - 120
        ) {
          console.log("触底！！！");
          if (this.checkOption.maxPage > this.checkOption.pageNow) {
            this.checkOption.pageNow++;
            this.loadList().then(() => {
              this.checkIsAll();
            });
          }
        }
      },
      /*
       * @description: 判断父级部门是否需要勾选上
       * @author: han
       * @date: 2021-02-04
       */
      checkParent() {
        let currentSidArr = timeInfo.state.tempSidArr;
        let currentDepIdArr = timeInfo.state.tempDepIdArr;
        let allSidFlag =
          new Set([...currentSidArr, ...this.allSidArr]).size ===
          currentSidArr.length;
        let allDepFlag =
          new Set([...currentDepIdArr, ...this.allDepIdArr]).size ===
          currentDepIdArr.length;
        if (allSidFlag && allDepFlag) {
          currentDepIdArr.push(this.checkOption.id);
        } else {
          currentDepIdArr = currentDepIdArr.filter(
            (id) => id != this.checkOption.id
          );
        }
        timeInfo.commit("setTempDepIdArr", [...new Set(currentDepIdArr)]);
      },
      getDepartmentInfo(depIdList) {
        return new Promise((resolve) => {
          Mt_Util.post("/rest/manage/wxwork/getWxWorkDepInfo", {
            depIdList: depIdList.toString(),
          }).then((res) => {
            if (res.data.success && res.data.data) {
              resolve(res.data.data);
            } else {
              stShowMsg({ content: res.data.msg });
            }
          });
        });
      },
      //page栈去重
      delRepeat() {
        let obj = {};
        timeInfo.state.selectPages = timeInfo.state.selectPages.reduce((pre, curr) => {
          if (!obj[curr.id]) {
            pre.push(curr);
            obj[curr.id] = true;
          }
          return pre;
        }, []);
      },
      saveReceiver() {
        let len = timeInfo.state.selectPages.length
        if (len >= 2) {
          timeInfo.commit("setCurrentDepartment", Object.assign({}, timeInfo.state.selectPages[len - 2]));
          timeInfo.state.selectPages.pop()
          this.$router.push({
            path: "/addAssist?id=1",
          });
        } else {
          this.$router.push({
            path: "/addAssist",
          });
        }
      },
      checkIsAll() {
        this.allcheck = this.list.every((item) => {
          return item.checkStatus === 2;
        });
      },
      checkList(item, index) {
        this.$set(this.list, index, item);
        this.sidArr = timeInfo.state.tempSidArr;
        this.list.forEach((item) => {
          if (!item.isStaff && item.sidList.length !== 0) {
            let filterList = item.sidList.filter((sid) => {
              return this.sidArr.includes(sid);
            });
            if (filterList.length === 0) {
              item.checkStatus = 0;
            } else if (filterList.length === item.sidList.length) {
              item.checkStatus = 2;
            } else {
              item.checkStatus = 1;
            }
          } else if (item.isStaff) {
            item.checkStatus = this.sidArr.includes(item.sid) ? 2 : 0;
          }
        });
        this.checkIsAll();
      },
      getDepartmentList(isSearch = false) {
        console.log(JSON.stringify(this.sidArr));
        console.log(JSON.stringify(this.depIdArr));
        return new Promise((resolve) => {
          let data = Object.assign(
            {
              sidList: timeInfo.state.tempSidArr.toString(),
              // depIdList: this.depIdArr.toString(),
              depIdList: "",
              permissions: 0,
              isWorker: true,
              isForGetAssistantList: true
            },
            this.checkOption
          );
          Mt_Util.post(
            "/rest/manage/wxwork/getWxWorkDepartmentList",
            data
          ).then((res) => {
            if (res.data.success && res.data.data) {
              let { corpDep, departmentList } = res.data.data;
              this.companyName = corpDep && corpDep.name;
              this.checkOption.maxPage = Math.ceil(
                res.data.total / this.checkOption.limit
              );
              if (isSearch) {
                this.allIdList = res.data.data.allIdList;
              }
              resolve(departmentList);
            } else {
              Vue.prototype.$messagebox(
                "提示",
                res.data.msg || "网络错误，请稍候重试"
              );
            }
          });
        });
      },
      loadList(isInit = false) {
        return new Promise((resolve) => {
          this.getDepartmentList().then((companyList) => {
            isInit && (this.list = []);
            companyList.forEach((item) => {
              this.list.push(item);
            });
            this.allcheck = this.list.every((item) => {
              return this.checkStatus == 2;
            });
            resolve();
          });
        });
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
      timeInfo.state.fromSet = true
    },
  });
})();
