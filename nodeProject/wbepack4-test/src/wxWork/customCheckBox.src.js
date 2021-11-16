;(function () {
  let mtButton = mtComponents.mtButton
  let mtButtonWrapper = mtComponents.mtButtonWrapper
  Mt_Util.router.customCheckBox = Vue.extend({
    name: 'customCheckBox',
    template: `
        <div class = "customCheckBox">
            <div class="checkInfoBox" @click="chooseAll">
                <div class="checkBox">
                    <img class="checkIcon" v-if="isCheckAll" :src="checkIcon">
                    <div v-else class="nocheckBox"></div>
                </div>
                <p>全部</p>
            </div>
            <div class="checkInfoBox" v-for="(item,index) in optionList" :key="index" @click="choose(index)">
                <div class="checkBox">
                    <img class="checkIcon" v-if="item.isCheck" :src="checkIcon">
                    <div v-else class="nocheckBox"></div>
                </div>
                <p>{{item.name}}</p>
            </div>
            <mt-buttonWrapper>
                <mt-button size="medium" class="cancelBtn" type="whiteGrey" @click="cancelCheck">取消</mt-button>
                <mt-button size="medium" type="mainColor" @click="toSave">确定</mt-button>
            </mt-buttonWrapper>
        </div>
    `,
    data() {
      return {
        isCheckAll: false,
        optionList: [],
        checkList: []
      }
    },
    components: {
      mtButton,
      mtButtonWrapper
    },
    computed: {
      checkIcon() {
        // return this.isOem ? `${resRoot}/image/wxwork/notDirectSale/check.png?v=202007281508` : `${resRoot}/image/wxwork/directSale/check.png?v=202007281508`
        return `${resRoot}/image/wxwork/directSale/check.png?v=202007281508`
      },
      isOem() {
        return initTsParam.isOem
      }
    },
    methods: {
      choose(index) {
        let obj = this.optionList[index]
        obj.isCheck = !obj.isCheck
        let checkIndex = this.checkList.indexOf(obj.id)
        if (checkIndex == -1) {
          this.checkList.push(obj.id)
        } else {
          this.checkList.splice(checkIndex, 1)
        }
        this.$set(this.optionList, index, obj)
        this.isCheckAll = this.optionList.every((item) => item.isCheck == true)
      },
      chooseAll() {
        this.isCheckAll = !this.isCheckAll
        this.optionList.forEach((item) => {
          item.isCheck = this.isCheckAll
        })
        this.checkList = []
        if (this.isCheckAll) {
          for (let item of this.optionList) {
            this.checkList.push(item.id)
          }
        }
      },
      toSave() {
        let list =
          this.$parent.groupType == 'person'
            ? this.$parent.personFieldsList
            : this.$parent.otherFieldsList
        let obj = list[this.$parent.currentSelectIndex]
        obj.value = this.checkList
        let valuesName = []
        for (let item of obj.optionList) {
          if (this.checkList.indexOf(item.id) !== -1) {
            valuesName.push(item.name)
          }
        }
        obj.valuesName = valuesName.join(',')
        this.$set(list, this.$parent.currentSelectIndex, obj)
        window.history.go(-1)
      },
      cancelCheck() {
        window.history.go(-1)
      }
    },
    created() {
      this.optionList = JSON.parse(this.$route.query.optionList)
      this.checkList = JSON.parse(this.$route.query.checkList)
      this.optionList.forEach((item) => {
        item.isCheck = this.checkList.indexOf(item.id) !== -1
      })
      this.isCheckAll = this.optionList.every((item) => item.isCheck == true)
    }
  })
})()
