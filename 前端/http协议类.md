#### http协议的4特点
1. 简单快速：每个资源URI，是固定的
2. 灵活：通过一个http协议就可以传输不同数据类型
3. **无连接**：连接一次就会断掉
4. **无状态**：客户端和服务端是两种身份的，不能记住上次的状态
#### http报文的组成部分（看一下network页签）
https://blog.csdn.net/u010256388/article/details/68491509
1. 请求报文  
    - 请求头
    - 请求行
    - 请求体
2. 响应报文 
    - 响应头
    - 响应行
    - 响应体
#### http常见的5个方法
1. get 获取资源
2. post 传输资源
3. put 更新资源
4. delete 删除资源
5. head 获得报文首部
#### post和get的区别
本质上是区别的，真正的区别是浏览器对于他们做的不同的实现。
1. get在浏览器回退时是不做响应的，而post会再次提交请求（看一下单页面是不是也会？）
2. get产生的URL地址可以被收藏，而post不可以（比如说我去看文档的时候，看到某个章节了，我就收藏等到下次看）
3. get请求会被浏览器主动缓存，而post不会，除非手动设置
4. get请求只能进行url编码，而post支持多种编码
5. get请求参数会被保留在浏览器历史记录内
6. get请求参数有长度限制，这个根据浏览器而定，但是post没有限制
7. 对参数的数据类型，get值接收ASCII字符，而post没有限制
8. get比post更不安全，因为参数直接暴露在URL上，所以不能用来传递敏感信息
9. get参数通过URL传递，POST放在RequestBody中。java中获取get请求的参数用@RequestParameter，获取post用@RequestBody

#### http状态码
1. 1**：指示信息-表示请求已接收，正在处理
2. 2**：成功-表示请求已被成功接收
3. 3**：重定向-要完成请求必须进行更进一步的操作
4. 4**：客户端错误-请求有语法错误或请求无法实现
5. 5**：服务器错误-服务器未能实现合法的请求
- 什么是持久链接（http1.1才开始支持）
http协议采用的是无连接协议，每次都要重新建立一个连接，然后使用完之后立即断开；keep-Alive模式，使客户端到服务端的链接持续有序，当出现后续请求时，避免了建立或重新建立连接
- 什么是管线化
在持久连接的时候，打包请求一次发送过去，响应也打包一次返回。仅支持HTTP/1.1技术，只有get和head请求可以进行管线化，而POST有所限制

## TCP协议
https://github.com/jawil/blog/issues/14
#### 概念
TCP（Transmission Control Protocol 传输控制协议）是一种面向连接的、可靠的、基于字节流的传输层通信协议
#### 特性
1. 在一个 TCP 连接中，仅有两方进行彼此通信。广播和多播不能用于 TCP
2. TCP 使用校验和，确认和重传机制来保证可靠传输
3. TCP 给数据分节进行排序，并使用累积确认保证数据的顺序不变和非重复
4. TCP 使用滑动窗口机制来实现流量控制，通过动态改变窗口的大小进行拥塞控制
##### 注意
TCP 并不能保证数据一定会被对方接收到，因为这是不可能的。TCP 能够做到的是，如果有可能，就把数据递送到接收方，否则就（通过放弃重传并且中断连接这一手段）通知用户。因此准确说 TCP 也不是 100% 可靠的协议，它所能提供的是数据的可靠递送或故障的可靠通知
#### 三次握手
1. 第一次握手：建立连接。客户端发送连接请求报文段，将SYN位置为1，Sequence Number为x；然后，客户端进入SYN_SEND状态，等待服务器的确认；
2. 第二次握手：服务器收到SYN报文段。服务器收到客户端的SYN报文段，需要对这个SYN报文段进行确认，设置Acknowledgment Number为x+1(Sequence Number+1)；同时，自己自己还要发送SYN请求信息，将SYN位置为1，Sequence Number为y；服务器端将上述所有信息放到一个报文段（即SYN+ACK报文段）中，一并发送给客户端，此时服务器进入SYN_RECV状态；
3. 第三次握手：客户端收到服务器的SYN+ACK报文段。然后将Acknowledgment Number设置为y+1，向服务器发送ACK报文段，这个报文段发送完毕以后，客户端和服务器端都进入ESTABLISHED状态，完成TCP三次握手。
完成了三次握手，客户端和服务器端就可以开始传送数据。
![image](https://user-images.githubusercontent.com/6896562/41697418-3ef2c7f2-754b-11e8-9d26-c56519a8f663.png)
#### 四次挥手
![image](https://raw.githubusercontent.com/HIT-Alibaba/interview/master/img/tcp-connection-closed-four-way-handshake.png)
#### 浏览器加载经历的过程
![image](https://mmbiz.qpic.cn/mmbiz_png/XIibZ0YbvibkXbzLEiaDlECKsXzwgAaLVx9VJE429e5uPFhaBu5YWs1sb6F29Cib3kGQw3CWFGjdf45Ln29URNx9Wg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### 描述网页从输入url到渲染的过程
1. 首先获取url 解析出ip地址 如果本地hosts中有配置优先取出配置  若没有则进行dns解析
2. tcp 三次挥手 建立连接
3. 客户端发送http请求
4. 服务器处理请求并响应
5. 浏览器处理资源文件进行渲染
6. tcp的四次挥手
