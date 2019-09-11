##### Vue源码分析
https://github.com/answershuto/learnVue<br>
http://hcysun.me/vue-design/appendix/vue-prototype.html


---
### 概念
##### MVVM的概念
MVVM是 模型-视图-视图模型 的意思。通过模型数据的改变可以更新视图模型，视图模型的改变也可以唤醒模型，然后在视图和视图模型这一块做了双向绑定，形成这样的三个部分的架构
##### vue的生命周期
vue的生命周期是vue从创建到初始化到销毁的一个过程，一般会经历八个生命周期钩子。
1. beforeCreate：组件创建前，这时候el和data都没有开始初始化。
2. created：创建完成，这个时候已经完成了data的初始化，这里可以进行ajax的请求操作。然后开始开始判断组件是否有el选项，没有的话要执行vm.$mount(el)才能进行下一步的初始化，接着开始判断是否有template选项，有的话就沿用template的模板进行初始化，没有的话就用render函数内编译的模板。
3. beforeMount：组件初始化前，这一部分是将组件的el往模板上挂载
4. mounted：el挂载完成，这时候可以进行dom节点的操作。比如说引用百度地图或者Echarts之类的图表，或者是一些外部的js对dom节点的监听事件。
5. beforeUpdate和updated：这里可以监听到data数据变化，但是一般不在这里进行数据的操作，而是看如果有些事件触发频率特别高的话，可以用函数防抖的方式来限制一下。
6. beforeDestroy和Destroy：路由的跳转，动态组件的切换或主动调用this.destroy()方法都会让这个组件销毁，组件销毁后会自动解绑这个组件的监听事件，比如说watch里面的，但是注意的一点是定时器或者之前在根实例this.$root添加的属性要手动清除。
- beforeMount	在挂载开始之前被调用，beforeMount之前，会找到对应的template，并编译成render函数
- mounted	实例挂载到DOM上，此时可以通过DOM API获取到DOM节点，$ref属性可以访问	常用于获取VNode信息和操作，ajax请求
- updated 可以把一些少变化的或者不变化的值放在这里，这样每次在函数内调用的时候不必每次都去获取，可以提高一些性能；如果有些事件触发频率特别高，可以用setTimeout和clearTimeOut()的方法来做间隔
- activated keep-alvie的时候用，每次切换到当前页面会触发。可以根据在data中定义的新老状态判断是否要重新进行ajax请求
- deactivated 每次离开当前页面的时候会触发，常用来做事件解绑
##### 等渲染完之后再取数的两种方法
- this.nextTick等dom渲染完后在执行逻辑
- setTimeout相当于在vue执行完创建到初始化之后，再执行

##### watch和computed的区别
###### computed：
- 首先一个是定义的问题，在computed内定义的变量就不用在data函数中再次定义了
- 计算属性相当于一个缓存，只有当函数内的属性改变时，才发生改变。
- 可以设置getter个setter，默认是无setter的，可以手动设置setter

```
oldKey: {
    get () {
        return this.key;
    },
    set (value) { // 如this.oldKey = val，val就是set的参数

    }
}
```

- 可以用来监听vuex中的state来实现组件通信
- 可以用来过滤v-for中的数据再显示
- 用到了适配器模式，把不能直接使用的数据，转换成可以直接使用的数据。比如说千分位和人民币大写
###### watch：
监听某个对象或者某个属性发生的变化，再执行操作
- deep: 深层监听
- immediate: 设置立即执行一次

##### data函数和data对象字面量的区别
- 如果data是字面量的话，当同时存在几个相同的子组件时，操作某个子组件的data的属性的时候，会把其他子组件的data也改变了，造成数据污染。
- 如果是函数的话，每个子组件返回的对象字面量都是独立的存在，不会相互干扰。


---

## 组件通信
#### 子组件向父组件：
-  通过$emit。通过事件的形式 
    - 当在子组件上定义事件时，是无法被点击的
```
// 这个无法被点击
<child @click="handle"></child>
```
解决办法：
1. 可以在子组件内定义一个真正的点击事件，然后再this.$emit('click')这个事件
2.通过 @click.native可以绑定原生的事件，而不是把click当做自定义属性
- 通过this.$parent（应急使用）。可以获取父组件的实例，对父组件进行操作。
    - **缺点：** 在绝大多数情况下，触达父级组件会使得你的应用更难调试和理解，尤其是当你变更了父级组件的数据的时候。当我们稍后回看那个组件的时候，很难找出那个变更是从哪里发起的。特别是组件嵌套的时候

##### 子组件更改父组件属性
https://cn.vuejs.org/v2/guide/components-custom-events.html#sync-%E4%BF%AE%E9%A5%B0%E7%AC%A6  

```
    // 父组件常规写法
    <component
        :is="currentTemp"
        :visible="visible"
        :title="dialogKey"
        :key="dialogKey"
        @update:visible="visible = $event">
    </component>
    // 父组件简写
    <component
        :is="currentTemp"
        :visible.sync="visible"
        :title="dialogKey"
        :key="dialogKey">
    </component>
// 子组件
    <div class="close-btn" @click="closeDialog"></div>
    
    methods: {
        closeDialog () {
        // 这里emit的方法，update的属性要和更改的属性一致
          this.$emit('update:visible', false)
        }
    }
```


#### 父组件向子组件：
- 通过props，传给子组件的是一个属性。（加:是js表达式，不加是字符串）
1. 由**单向数据流**的概念，子组件里面只能读取父组件传来的props属性，不能修改，否则会造成数据污染。如果要改父组件传来的数据可以在data里面再定义一个属性(章节4-2第8分钟)
2. 数据校验：在props的属性定义父组件传来的属性的校验
```
props{
    content: String
    content: [String, number]
    content: {
        type: String,
        required: true
    }
}
```
- 通过$children数组
    - **缺点：** 需要注意 $children 并不保证顺序，也不是响应式的
- 通过$ref定位到子组件，再对子组件数据进行操作<br>
    - **缺点：** $refs只会在组件渲染完成之后生效，并且它们不是响应式的。这仅作为一个用于直接操作子组件的“逃生舱”——你应该避免在模板或计算属性中访问 $refs

```
// 这里获取到还不是最新的class
console.log(this.$refs.testIcon.className)
// 这里获取到到了渲染完成的DOM
this.$nextTick(() => {
    console.log(`this.$nextTick:` + this.$refs.testIcon.className)
})
```

###### 非父子组件
1. 通过vuex
2. 总线机制/Bus/发布订阅模式
```
// main.js中
Vue.prototype.bus=new Vue();
// 其他组件
methods:{
    getText:function(){
        //this.bus执行vue实例,
       this.bus.$emit('get',this.Con_msg)
    }
},
mounted:function(){
    var that=this;
    this.bus.$on('get',function(msg){
        that.Con_msg=msg
    })
}

```
3. vue2.6后出来Vue.observable<br>
返回的对象可以直接用于**渲染函数**和**计算属性**内，并且会在发生改变时触发相应的更新。也可以作为最小化的**跨组件状态存储器**<br>
如果想在watch内监听的话就在原型上引用，或者在每一个组件中的data赋值一次
```
const state = Vue.observable({ count: 0 })

const Demo = {
  render(h) {
    return h('button', {
      on: { click: () => { state.count++ }}
    }, `count is: ${state.count}`)
  }
}
```
4. 访问根实例，通过this.$root.store来存储全局的数据（写法等价于this.$root.$data.store）

```
// 获取根组件的数据
this.$root.foo
// 写入根组件的数据
this.$root.foo = 2
// 访问根组件的计算属性
this.$root.bar
// 调用根组件的方法
this.$root.baz()
```
###### 不是响应式的另外两种，个人的理解
5. 创建一个js文件，专门用来存储要共享的数据对象。（export导出的根变量无法被setter，只能改object类型的）
6. 在Vue.prototype上再定义一个原型对象。Vue本质上是一个构造函数，在他实例化之前在他的原型上声明一个对象，就可以被他所有的实例共享。但是这个对象没有定义在data上，无法被vue渲染成响应式的，而且在原型上一般只声明方法，不声明对象，因为这样做会存在数据污染的问题。
---

#### 响应式和非响应式的区别
猜想：
- 响应式：数据修改时能被计算属性监听到，或者直接触发DOM的更新
- 非响应式：无法被计算属性监听，且不能触发DOM更新(由于 Vue 会在初始化实例时对属性执行 getter/setter 转化，
所以**属性必须在 data 对象上存在**才能让 Vue 将它转换为**响应式**的)

```
// 例如：
var vm = new Vue({
  data:{
    a:1
  }
})

// `vm.a` 是响应式的

vm.b = 2
// `vm.b` 是非响应式的
```
###### 注意事项
**==对于已经创建的实例，Vue 不允许动态添加根级别的响应式属性==**<br>
所以Vue.set方法才会需要一个Object对象

```
错误示范：
this.observeData.a = 0 // 不能先添加这个，会导致不能新增的属性不是响应式
this.$set(this.observeData, 'a', 0)

正确示范：
this.$set(this.observeData, 'a', 0)
```


###### 组件渲染
- 如果想在某个部分使用组件
```
<div is="component"></div>
```
这里的div会被组件替换，is怎么传参呢？
- 非根组件时，组件的data必须是个函数

```
<app :data-content="content" @change-data="changeData"></app>
<app :data-content="content" @change-data="changeData"></app>
<app :data-content="content" @change-data="changeData"></app>

var dataModel = {}
var temp = {
    template: ``,
    data: dataModel  // 这样会因为是共同引用产生冲突
}
```


###### 计算属性：computed
- 内置缓存：只要被计算的函数内的属性没有发生变化，就不会重新计算
可以把一维数组转成二维数组，来做一个轮播图多页切换的功能

###### vue的set方法
- 对象的set方法：vm.$set(this.userInfo, 'name', 'wdq')；如果直接this.userInfo.name是无法触发视图更新的
- 数组的set方法：vm.$set(this.list, index, value)；也可以通过观察数组变异的方法，push,pop,shift,unshift,reverse,sort,splice；this.list[index] = value是无法改变的
- 或者改变对象的引用也可以触发视图更新，三种办法

###### 通过ref获取dom节点或组件
dom节点
```
<div ref="hello"></div>

handle: function() {
    // hello为页面所有refs中的ref
    this.$refs.hello  // 这个标签的dom元素
    this.$refs.hello.innerHtml // 元素对应的html
}
```
组件
```
<app ref="hello"></app>

handle: function() {
    // hello为页面所有refs中的ref
    this.$refs.hello  // 这个标签的组件
    this.$refs.hello.number // number对应的data中的属性
}
```

#### 插槽slot
插槽，也就是slot，是组件的一块HTML模板，这块模板显示不显示、以及怎样显示由父组件来决定。 实际上，一个slot最核心的两个问题在这里就点出来了，是显示不显示和怎样显示<br>
##### 2.5版本
不需要在template或者component上面指定slot，想怎么插就怎么插<br>
###### 普通插槽
```
<!--父组件-->
<child>
    <p>我是插槽的内容</p>
</child>
<!--子组件-->
template: `<slot>默认内容</slot>`
```
###### 具名插槽
```
<!--父组件-->
<child>
    <p slot='p1'>我是插槽的内容1</p>
    <p slot='p2'>我是插槽的内容2</p>
</child>
<!--子组件-->
template: `<slot name='p1'>默认内容</slot>
<slot name='p2'>默认内容</slot>`
```

###### 作用域插槽<br>
应用场景：子组件做循环，或者某一部分的dom结构要由外部传进来的时候（传DOM这个是插槽的应用场景还是作用域插槽的？）。<br>
猜想：比方我要点击一个节点的时候，要显示他的属性列表，在A页面的时候，我只需要看到看到他绑定的事件和业务流程之类的属性；在B页面我要看到这个节点的坐标还有颜色之类的属性。

```
<!--父组件-->
<slot-test>
    <p slot="scopeSlot" slot-scope="scopeInfo">作用域插槽：{{scopeInfo.userName}}</p>
</slot-test>
<!--子组件-->
<template>
    <button class="btn">
        <slot name="scopeSlot" :userName="userName"></slot>
    </button>
</template>
```

##### 2.6版本
- v-slot必须写在template或者component中
- 可以使用缩写#，只能在有参数的时候用，如果没有参数就#default
- 动态插槽名，语法：v-slot:[slotName]

```
<!--父组件-->
<slot-test>
    <template v-slot>
        <p>我是父组件传过来的内容</p>
    </template>
    <template #hasName>
        <p>具名插槽</p>
    </template>
    <template v-slot:scopeSlot="slotProps">
        <p>作用域插槽：{{slotProps.scopeInfo.userName}}</p>
    </template>
    <!--解构的写法-->
    <template v-slot:scopeSlot="{scopeInfo}">
        <p>作用域插槽：{{scopeInfo.userName}}</p>
    </template>
</slot-test>
<!--子组件-->
<template>
    <div>
        <button class="btn">
            <slot></slot>
        </button>
        <button class="btn">
            <slot name="hasName"></slot>
        </button>
        <button class="btn">
            <slot name="scopeSlot" :userName="userName"></slot>
        </button>
    </div>
</template>
```


###### v-once
提高静态组件的复用性，直接把组件放到内存里面

###### vue中的动画原理
用transition标签包裹起来<br>
条件渲染 (使用 v-if)<br>
条件展示 (使用 v-show)<br>
有6个状态的class![image](https://cn.vuejs.org/images/transition.png)

```
.v-enter, .v-leave-to {
    opacity: 0 // 用来定义状态
}
.v-enter-active, .v-leave-active {
    transition: opacity 3s // 用来监听过渡属性和时间
}
```
**css动画**<br>
@keyframe和animate.css<br>
**js动画**<br>
velocity.js
```
js动画的钩子
<transition
  v-on:before-enter="beforeEnter"
  v-on:enter="enter"
  v-on:after-enter="afterEnter"
  v-on:enter-cancelled="enterCancelled"

  v-on:before-leave="beforeLeave"
  v-on:leave="leave"
  v-on:after-leave="afterLeave"
  v-on:leave-cancelled="leaveCancelled"
>
  <!-- ... -->
</transition>

function(el, done) {
    el.style.color = 'red'
    done() // 代表动画已完成，可以进行下一个动画
}
```
**动态组件过渡**<br>
还是包裹在transition标签中，然后用<component :is="type"></component>

**列表过渡**<br>
用<transition-group>

###### keep-alive
- 用keep-alive标签包裹起来的组件可以在第二次请求后放到内存中，避免重复请求消耗内存
- 在keep-alive标签中使用exclude="组件名"，这个组件就可以不做缓存

```
<keep-alive>
    <router-view/>
</keep-alive>
```
当使用keep-alive标签时，会多出一个生命周期函数actived。每次页面重新加载时，mounted函数不会执行了，但是actived函数会执行，可以在这里做判断，提高组件复用率

###### 动态路由

```
{
    path: '/detail/:id'
}
```

###### .prevent可以阻止默认行为

---
### VueX
###### 概念
vuex是一个状态管理模式，用于不同组件（不同实例也可以？）之间的数据通信，管理共享的状态。
###### 优点：
可以在vue的插件里面看到变更的状态变化

###### 项目结构
Vuex 并不限制你的代码结构。但是，它规定了一些需要遵守的规则：

1. 应用层级的状态应该集中到单个 store 对象中。
1. 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
1. 异步逻辑都应该封装到 action 里面。<br>
只要你遵守以上规则，如何组织代码随你便。如果你的 store 文件太大，只需将 action、mutation 和 getter 分割到单独的文件。<br>
对于大型应用，我们会希望把 Vuex 相关代码分割到模块中。

![image](https://vuex.vuejs.org/vuex.png)
1. state：可以用localStorage持久化
2. mutations：如果不用异步可以直接提交到这里
3. action：常用于异步操作
4. getter：相当于计算属性，会缓存得到的过滤结果
5. module：将状态模块化


---
## Vue Router
### 导航守卫
1. 全局守卫
2. 路由独享守卫
3. 组件的守卫
### 动态路由匹配
#### 核心
在路由路径中使用“动态路径参数”(dynamic segment) 

```
const User = {
  template: '<div>User</div>'
}

const router = new VueRouter({
  routes: [
    // 动态路径参数 以冒号开头
    { path: '/user/:id', component: User }
  ]
})
// 现在呢，像 /user/foo 和 /user/bar 都将映射到相同的路由。
```
#### 需注意的点
- 如果没有动态参数匹配，url中无法保存参数，通过params传参刷新后就会消失，可以使用query来做替代方案
- 路由跳转时，如果只是动态参数发生改变，组件将会被复用，无法触发mounted
- 可以在watch里面监听路由变化

```
const User = {
  template: '...',
  watch: {
    '$route' (to, from) {
      // 对路由变化作出响应...
    }
  }
}
```
- 可以使用通配符的方式配合pathMatch来匹配路由

```
{
  // 会匹配所有路径
  path: '*'
}
{
  // 会匹配以 `/user-` 开头的任意路径
  path: '/user-*'
}
```
### 滚动行为
#### 核心
设置一个方法，让路由跳转的时候滚动到某个位置。待更新...
### 路由懒加载
#### 核心
通过Vue的异步组件和webpack的代码分离实现。

```
const Flow = () => import("../pages/Flow.vue") // 懒加载

// 路由这边的写法不变
export default new Router({
    routes: [
        {
            path: "/",
            name: "Flow",
            component: Flow
        }
    ]
})
```
