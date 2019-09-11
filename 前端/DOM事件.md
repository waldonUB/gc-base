**基本概念**
- DOM事件的级别
- DOM事件模型，DOM事件的模型是什么？指的是冒泡和捕获（非常重要）
- DOM事件流
- 描述DOM事件捕获的具体流程
- Event对象的常见应用
- 自定义事件（非常重要）

两个重要的点：
1. 怎么捕获和冒泡
2. 怎么注册事件，监听用户的行为

##### BOM和DOM的区别

![image](https://img-my.csdn.net/uploads/201212/18/1355820423_6946.jpg)
###### BOM：
bom 只是很久以前对没有进入dom标准的某些 api 的称呼。
1. BOM是Browser Object Model的缩写，即浏览器对象模型。
2. BOM没有相关标准。
3. BOM的最根本对象是window

###### DOM：（文档对象模型）
1. DOM是Document Object Model的缩写，即文档对象模型。
2. DOM是W3C的标准。
3. DOM最根本对象是document（实际上是window.document）

###### 获取DOM节点的几种方式
- getElementById
- getElementByName
- getElementByTagName
- getElementByClassName
- querySelectorAll
- querySelector

```
// querySelector和getElement本质上获取的东西是一样的，兼容性方面querySelector更好点
    // 区别：
    // 1.兼容性
    // 2.获取节点的动态性
    // 3.灵活性
    // 4.效率
    var testDiv = document.querySelectorAll(".test-query") // 获取的是一个快照，静态的元素
    var testP = document.getElementsByClassName("test-get") // 动态获取，后面增加元素还会获取到
    var p2 = document.createElement("p")
    p2.setAttribute("class", "test-get")
    document.body.appendChild(p2)
```


**DOM事件类，事件级别**

- **DOM0**  element.onclick = function() {}
- **DOM2** element.addEventListener('click', function(){}, false)，这里的布尔值指定了是冒泡还是捕获
- **DOM3** element.addEventListener('keyup', function(){}, fasle)

#### 事件模型
###### 概念
浏览器的事件模型分为冒泡和捕获
- 捕获（往下）
- 冒泡（网上）

#### 事件流
三个阶段
1. 捕获
2. 目标阶段，事件通过捕获到达目标元素
3. 冒泡，从目标元素上传到window对象<br>
**概括：**<br>
流程是先捕获再冒泡，到达目标节点的时候看捕获和冒泡事件注册的顺序决定这个节点的捕获和冒泡的执行顺序。而事件监听默认执行是在冒泡阶段进行的(useCapture：false)，参数为true时才在捕获阶段执行<br>

#### 事件代理
###### 优点
节省内存，提高性能
###### 原理
利用事件流的传播机制，事件流的三个阶段是：1.先捕获，2.到达目标元素，3.冒泡，然后根据目标元素来执行对应的事件
#### 阻止冒泡和捕获：
- e.stopPropagation() // 阻止上一级的冒泡或捕获
- e.stopImmediatePropagation()除了阻止上一级的冒泡或捕获，还能阻止相同元素绑定的其他事件（事件注册顺序很重要）
- e.preventDefault 阻止默认事件，比如a标签打开链接
#### DOM事件的具体流程
- 捕获
从上往下
1. window
2. document
3. html
4. body
5. 普通的html结构
- 冒泡
从下往上

###### Event对象的常见应用
- event.preventDefault
- event.stopPropagation(阻止父级元素的冒泡)
- event.stopImmediatePropagation
- event.currentTarget
- event.target

###### 监听滚动事件

```
// 这个是对全局事件的一个绑定，不需要的时候要做解绑
window.addEventListener('scroll', function(){})
// 距离顶部的值
const top = document.documentElement.scrollTop
```

customEvent是怎么用的？是怎么传递数据的？

###### addEventListener
https://segmentfault.com/a/1190000005654451<br>
https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener<br>
先捕获再冒泡

老版本：<br>
element.addEventListener(event, function, useCapture)<br>
- 第一个参数是需要绑定的事件
- 第二个参数是触发事件后要执行的函数
- 第三个参数默认值是false，表示在事件冒泡阶段调用事件处理函数;如果参数为true，则表示在事件捕获阶段调用处理函数
新版本：<br>
target.addEventListener(type, listener[, options]);<br>

###### 鼠标事件
**事件名称：**<br>
- mousedown：鼠标的键钮被按下。
- mouseup：鼠标的键钮被释放弹起。
- click：单击鼠标的键钮。
- dblclick：鼠标的键钮被按下。
- contextmenu ：弹出右键菜单。
- mouseover：鼠标移到目标的上方。
- mouseout：鼠标移出目标的上方。
- mousemove：鼠标在目标的上方移动。<br>
**坐标取值：**<br>
- clientX：当鼠标事件发生时（不管是onclick，还是omousemove，onmouseover等），鼠标相对于浏览器（这里说的是浏览器的有效区域）x轴的位置；
- clientY：当鼠标事件发生时，鼠标相对于浏览器（这里说的是浏览器的有效区域）y轴的位置；
- screenX：当鼠标事件发生时，鼠标相对于显示器屏幕x轴的位置；
- screenY：当鼠标事件发生时，鼠标相对于显示器屏幕y轴的位置；
- offsetX：当鼠标事件发生时，鼠标相对于事件源x轴的位置
- offsetY：当鼠标事件发生时，鼠标相对于事件源y轴的位置


### Eventloop
https://juejin.im/post/59e85eebf265da430d571f89
###### 渲染机制：https://github.com/aooy/blog/issues/5
##### 概念
eventloop就是事件循环模型。他是js实现异步的一种方式，也是js的执行机制。
##### 核心
队列中的task包括两种：
###### macrotask（宏任务）主要包含：
1. setTimeout
1. setInterval
1. http请求
1. UI rendering
1. dom事件
###### microtask（微任务）主要包含：
1. Promise
2. process.nextTick
3. MutaionObserver<br>
优先清空nexttick queue，即通过process.nextTick注册的函数
再清空other queue，常见的如Promise

执行顺序：
先执行同步的代码
如果有microtask，就清空microtask中队列，
再执行task中任务
执行task中同步的代码，再执行microtask中的

###### 执行栈（javascript execution context stack）
每个函数执行的时候，都会生成执行上下文（JavaScript execution context），执行上下文包括传入的参数和局部变量之类的信息，他会被推入栈中，等到函数执行完成再从栈中弹出
