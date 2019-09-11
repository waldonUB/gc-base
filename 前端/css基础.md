## 注意的点
- ##### 解决display: inline-block中的间隙
1. 设置父元素的font-size: 0，子元素的font-size正常
2. 把元素都写到同一行
3. 如果是ul li的格式的话，设置li标签不闭合
4. css4中的white-space-collapsing
- ##### flex不指定子元素height为100%时会撑开高度

## 基础知识
### 盒模型
#### 基本组成
- margin + border + padding + content
#### 标准模型 + IE模型
##### 区别
- 标准模型的高度和宽度指的是content的宽高
- IE模型的宽高指的是内边距+边框+content的宽高（content + padding + border）
##### 怎么转换
如何设置两种模型？
css3的语法  
- box-sizing：content-box（浏览器默认方式）
- box-sizing：border-box（IE默认，怪异盒模型）

##### js如何获取盒模型宽高？
- dom.style.width/height  局限性：取不到外联样式？
- dom.currentStyle.width/height  拿到渲染以后的（只支持IE）
- window.getComputedStyle(dom).width/height  // **兼容性比较好，比较通用**


### CSS样式

#### css引样式的三种方式
1. 外部样式，<link href="" rel="stylesheet"/>
2. 内部样式（内嵌样式），head内的style
3. 内联样式（行内样式），dom元素中style

#### 边距重叠发生的三种情况
首要条件：在同一个BFC内才会发生边距重叠
1. 相邻元素之间：垂直方向会发生边距重叠，默认取外边距最大的那个值
2. 父子元素之间
    - 父元素与第一个元素：
        - 没有border和padding或行内内容
        - 没有创建BFC或清除浮动
    - 父元素与最后一个元素：
        - 高度为auto
3. 空的块级元素

#### 针对父子和相邻元素的三种边距重叠解决方案
1. 相邻元素
    1. 在外面套一层BFC使两个元素不在同一个BFC内（缺点是加了一层无意义的div）
    2. 给后面一个元素加浮动
    3. 给其中一个元素的display设置inline开头的属性，比如inline-block,inline-flex（只有一个的话不会在同一行显示，虽然还是在同一个BFC内，但是可以达到解决的效果）
2. 父子元素
    1. 加border或padding或行内内容
    2. 加一个BFC
    3. 和最后一个元素的边距重叠只有当父元素高度为auto的时候存在

#### BFC的4个特性
1. 计算BFC高度的时候，浮动元素也会参与计算（主要作用）
1. 属于同一个BFC内的元素的垂直方向边距发生重叠
1. BFC区域不会与浮动元素相互重叠
1. 里外的元素互不影响

#### 创建BFC的5种方式
1. 根元素
2. float的值不为none（因为浮动值默认为none）
3. position的值不是static或者relative
4. display的属性时inline-block,table，table-cell，flex，grid
5. 最常用的是overflow:hidden,overflow:auto

#### BFC的两个主要使用场景
- 解决元素的边距重叠
- 用来清除内部浮动，BFC子元素即使是float，也会参与高度计算


###### 块格式化上下文（BFC）有下面几个特点：

- BFC是就像一道屏障，隔离出了BFC内部和外部，内部和外部区域的渲染相互之间不影响。BFC有自己的一套内部子元素渲染的规则，不影响外部渲染，也不受外部渲染影响。
- BFC的区域不会和外部浮动盒子的外边距区域发生叠加。也就是说，外部任何浮动元素区域和BFC区域是泾渭分明的，不可能重叠。
- BFC在计算高度的时候，内部浮动元素的高度也要计算在内。也就是说，即使BFC区域内只有一个浮动元素，BFC的高度也不会发生塌缩，高度是大于等于浮动元素的高度的。
- HTML结构中，当构建BFC区域的元素紧接着一个浮动盒子时，即，是该浮动盒子的兄弟节点，BFC区域会首先尝试在浮动盒子的旁边渲染，但若宽度不够，就在浮动元素的下方渲染

###### 伪元素
- ::after (:after)
- ::first-line (:first-line)
- ::before (:before)
- ::first-letter (:first-letter)
- ::selection

###### 伪类
https://developer.mozilla.org/zh-CN/docs/Web/CSS/Pseudo-classes<br>
- :only-child。代表了属于某个父元素的唯一一个子元素
- :active
- :out-of-range
- :hover
- :focus
- :linked
- :nth-child()
- :read-only
- :disabled
### 雪碧图
#### 使用场景
1. 静态图片，不随用户信息变化而变化
2. 小图片，容量比较小
3. 加载量比较大
#### 为什么使用
减少http的请求数（http建立链接是需要开销的），加速内容显示
#### 原理
通过设置background-position属性
#### 使用方式
1. 可以通过谷歌浏览器，上下箭头控制坐标的精确值
2. webpack的插件
3. cssGaga
#### 痛点
1. 每新增一个图片都要改一次原图片，还有可能不小心弄错原图片的位置，维护困难
#### 新的优化解决方案
1. 可以使用fontAwasome或者阿里巴巴的iconfont来字体图标库来显示大部分图标
2. 对于彩色图标，现在iconfont也支持上传和下载svg矢量图了
### CSS层叠
##### 1. 层叠上下文
1. HTML中的根元素<html></html>本身j就具有层叠上下文，称为“根层叠上下文”。
1. 普通元素设置position属性为非static值并设置z-index属性为具体数值，产生层叠上下文。
1. CSS3中的新属性也可以产生层叠上下文。  

层叠上下文可以理解为在同一个盒子中，谁的z-index大，谁就在上面
##### 2. 层叠等级（层叠水平/stacking level）
普通元素的层叠水平优先由层叠上下文决定，因此，层叠水平的比较只有在当前层叠上下文元素中才有意义
##### 3. 层叠顺序
![image](https://user-gold-cdn.xitu.io/2018/8/30/1658910c5cb364b6?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
- inline/inline-block元素的层叠顺序要高于block(块级)/float(浮动)元素，这样文字可以优先显示
##### 4. z-index
对于一个已经定位的元素（即position属性值不是static的元素），z-index 属性指定：

1. 元素在当前堆叠上下文中的堆叠层级。
1. 元素是否创建一个新的本地堆叠上下文。

- z-index: auto时，不会建立一个新的本地堆叠上下文，各自盒子中的子元素，谁的z-index高就在前面
- z-index: 0时，创建一个堆叠层级为0的本地堆叠上下文，后面盒子的层叠等级比前面的高，所以子元素会覆盖前面的

### CSS权重（CSS优先级
https://juejin.im/post/5afa98bf51882542c832e5ec）
### 作用
一个元素可能使用了不同规则的样式，依据权重优先级可以判断出哪个与元素最相关
### 权重优先级

1. !important;
1. 行内样式;
1. ID选择器, 权重:100;
1. class,属性选择器和伪类选择器，权重:10;
1. 标签选择器和伪元素选择器，权重:1;
![](http://ww1.sinaimg.cn/large/00760Iw1gy1g5k9leleywj30jv0lw76b.jpg)
