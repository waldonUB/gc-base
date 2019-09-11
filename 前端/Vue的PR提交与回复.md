1. 点击第二个tem1按钮，将key值切换到 b
2. 点击temp2或者temp3按钮，将key值切换到 c 或 d 
3. 


#### 使用场景
- 我需要对话框来缓存数据，但是很多对话框是相同的组件，以不同的编码来查询不同的数据
- 以编码作为key值绑定在component上缓存组件，避免重新打开时再次查询
- 加上max属性，防止内存溢出

#### 绑定key时，max存在的问题
- 当同一个组件有多个key绑定时，当key的数量 >= max的值，max将会缓存相同的key，不会触发生命周期中的destroyed函数  
![](http://ww1.sinaimg.cn/large/00760Iw1gy1g57y2y0ef4j30g80ipgmb.jpg)

#### 以往类似的issue
- https://github.com/vuejs/vue/issues/6509



很感谢您的解答。我在``max``的实现源码中发现，组件清除的时候使用了``cache[key] = null``
，其中的key就是component中绑定的key，我猜测应该是当初预留的一个方案。



![](http://ww1.sinaimg.cn/large/00760Iw1gy1g58dn4iyinj30r80dbgnq.jpg)  

https://codepen.io/waldonUB/pen/xvOgQB?editors=1111  


## 总结
### 问题应用场景
### 解决的痛点
### 解决的过程
### 后续的优化