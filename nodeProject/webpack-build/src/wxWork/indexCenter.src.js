;(function () {
  let routeMap = [
    {
      path: '',
      redirect: '/customCenter'
    },
    {
      path: '/customCenter',
      name: 'customCenter',
      component: function () {
        return Mt_Util.loadRouter('customCenter').then(function (router) {
          return router
        })
      },
      children: [
        {
          name: 'editCustom',
          path: '/customCenter/editCustom',
          component: function () {
            return Mt_Util.loadRouter('editCustom').then(function (router) {
              return router
            })
          },
          children: [
            {
              name: 'customCheckBox',
              path: '/customCenter/editCustom/customCheckBox',
              component: function () {
                return Mt_Util.loadRouter('customCheckBox').then(function (router) {
                  return router
                })
              }
            },
            {
              name: 'editTag',
              path: '/customCenter/editCustom/addTag',
              component: function () {
                return Mt_Util.loadRouter('addTag').then(function (router) {
                  return router
                })
              }
            }
          ]
        },
        {
          name: 'addFollow',
          path: '/customCenter/addFollow',
          component: function () {
            return Mt_Util.loadRouter('addFollow').then(function (router) {
              return router
            })
          }
        },
        {
          name: 'addTag',
          path: '/customCenter/addTag',
          component: function () {
            return Mt_Util.loadRouter('addTag').then(function (router) {
              return router
            })
          }
        }
      ]
    },
    {
      path: '/groupCenter',
      name: 'groupCenter',
      component: function () {
        return Mt_Util.loadRouter('groupCenter').then(function (router) {
          return router
        })
      }
    },
    {
      path: '/chatCenter',
      name: 'chatCenter',
      component: function () {
        return Mt_Util.loadRouter('chatCenter').then(function (router) {
          return router
        })
      }
    },
    {
      name: 'addAssist',
      path: '/addAssist',
      component: function () {
        return Mt_Util.loadRouter('addAssist').then(function (router) {
          return router
        })
      }
    },
    {
      name: 'setAssist',
      path: '/setAssist',
      component: function () {
        return Mt_Util.loadRouter('setAssist').then(function (router) {
          return router
        })
      }
    },
    {
      path: '/marketCenter',
      name: 'marketCenter',
      component: function () {
        return Mt_Util.loadRouter('marketCenter').then(function (router) {
          return router
        })
      },
      children: [
        {
          name: 'formVisitData',
          path: '/marketCenter/formVisitData',
          component: function () {
            return Mt_Util.loadRouter('formVisitData').then(function (router) {
              return router
            })
          }
        },
        {
          name: 'preview',
          path: '/marketCenter/preview',
          component: function () {
            return Mt_Util.loadRouter('preview').then(function (router) {
              return router
            })
          }
        }
      ]
    }
  ]

  //路由对照表
  Mt_Util.router = new VueRouter({
    mode: 'hash',
    routes: routeMap
  })

  new Vue({
    el: '#indexCenter',
    template: `
        <div>
            <div class="tabbar" v-if="!isShowTabBar">
                <div class="tabbarItem" v-if="!entryGroup" :class="selectTab=='customCenter'?'activeTab':''" id="custom" @click="changeTab('customCenter')">
                    <router-link :to="{name:'customCenter'}">
                        <div class="linkItem">
                            <img class="tabbarIcon" slot="icon" :src="customIcon">
                            <p class="tabbarTitle">客户详情</p>
                        </div>
                    </router-link>
                </div>
                <div class="tabbarItem" v-if="entryGroup" :class="selectTab=='groupCenter'?'activeTab':''" id="custom" @click="changeTab('groupCenter')">
                    <router-link :to="{name:'groupCenter'}">
                        <div class="linkItem">
                            <img class="tabbarIcon" slot="icon" :src="groupIcon">
                            <p class="tabbarTitle">群详情</p>
                        </div>
                    </router-link>
                </div>
                <div v-if="hasFuncPermission" class="tabbarItem" :class="selectTab=='chatCenter'?'activeTab':''" id="chat" @click="changeTab('chatCenter')">
                    <router-link :to="{name:'chatCenter'}">
                        <div class="linkItem">
                            <img class="tabbarIcon" slot="icon" :src="chatIcon">
                            <p class="tabbarTitle">快捷回复</p>
                        </div>
                    </router-link>
                </div>
                <div class="tabbarItem" :class="selectTab=='marketCenter'?'activeTab':''" id="market" @click="changeTab('marketCenter')">
                    <router-link :to="{name:'marketCenter'}">
                        <div class="linkItem">
                            <img class="tabbarIcon" slot="icon" :src="marketIcon">
                            <p class="tabbarTitle">营销工具</p>
                        </div>
                    </router-link>  
                </div>
            </div>
            <keep-alive include="customCenter">
                <router-view></router-view>
            </keep-alive>
        </div>
    `,
    async created() {
      let staffOption = {
        isRoleAuth: true,
        func: 'officeCase'
      }
      this.hasFuncPermission = await Mt_Util.getStaffInfo(staffOption)
      if (!this.hasFuncPermission && this.$route.name === 'chatCenter') {
        // 如果没有权限直接显示缺省页
        this.$router.push({
          name: 'customCenter'
        })
        return
      }

      await Mt_Util.initWxConfig()

      this.entryGroup = await Mt_Util.checkContext('group')
      this.checkRouter()
    },
    router: Mt_Util.router,
    watch: {
      $route(to, from) {
        this.selectTab = to.path.split('/')[1]
        this.isShowTabBar = this.selectTab == 'addAssist' || this.selectTab == 'setAssist'
      }
    },
    data() {
      return {
        selectTab: 'customCenter',
        hasFuncPermission: true, // 是否有显示该功能的权限
        entryGroup: false, // 是否是群聊进入
        isShowTabBar: false //是否显示tabbar
      }
    },
    computed: {
      /**
       * 是否分销
       * @author waldon
       * @date 2020/4/10
       * @returns {boolean} 是否分销
       * */
      isOem() {
        return initTsParam.isOem
      },
      customIcon() {
        // return this.selectTab === 'customCenter' ?
        //         (this.isOem ? `${resRoot}/image/wxwork/notDirectSale/custom_active.png?v=202007281508` : `${resRoot}/image/wxwork/directSale/custom_active.png?v=202007281508`):
        //         `${resRoot}/image/wxwork/common/customIcon.png?v=202007281508`
        return this.selectTab === 'customCenter'
          ? `${resRoot}/image/wxwork/directSale/custom_active.png?v=202007281508`
          : `${resRoot}/image/wxwork/common/customIcon.png?v=202007281508`
      },
      chatIcon() {
        // return this.selectTab === 'chatCenter' ?
        //     (this.isOem ? `${resRoot}/image/wxwork/notDirectSale/chat_active.png?v=202007281508` : `${resRoot}/image/wxwork/directSale/chat_active.png?v=202007281508`):
        //     `${resRoot}/image/wxwork/common/chatIcon.png?v=202007281508`
        return this.selectTab === 'chatCenter'
          ? `${resRoot}/image/wxwork/directSale/chat_active.png?v=202007281508`
          : `${resRoot}/image/wxwork/common/chatIcon.png?v=202007281508`
      },
      marketIcon() {
        // return this.selectTab === 'marketCenter' ?
        //     (this.isOem ? `${resRoot}/image/wxwork/notDirectSale/market_active.png?v=202007281508` : `${resRoot}/image/wxwork/directSale/market_active.png?v=202007281508`):
        //     `${resRoot}/image/wxwork/common/marketIcon.png?v=202007281508`
        return this.selectTab === 'marketCenter'
          ? `${resRoot}/image/wxwork/directSale/market_active.png?v=202007281508`
          : `${resRoot}/image/wxwork/common/marketIcon.png?v=202007281508`
      },
      groupIcon() {
        return this.selectTab === 'groupCenter'
          ? `${resRoot}/image/wxwork/directSale/custom_active.png?v=202007281508`
          : `${resRoot}/image/wxwork/common/customIcon.png?v=202007281508`
      }
    },
    methods: {
      onValuesChange() {},
      changeTab(tab) {
        this.selectTab = tab
      },
      /**
       * @description 根据路由判断是否需要重定向跳转
       * @author enson
       * @date 2021-01-27
       */
      checkRouter() {
        const checkQuene = [
          {
            check: this.entryGroup,
            from: 'customCenter',
            to: 'groupCenter'
          },
          {
            check: !this.entryGroup,
            from: 'groupCenter',
            to: 'customCenter'
          }
        ]

        let target = checkQuene.find((item) => {
          return item.check && this.$route.name === item.from
        })

        if (target && target.to) {
          this.selectTab = target.to
          this.$router.push({
            name: target.to
          })
        }
      }
    }
  })
})()
