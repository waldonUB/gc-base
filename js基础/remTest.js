var g_rem = 20;
(function(win){
    var orientationX = false; //是否横屏进来
    if(win.orientation==90||win.orientation==-90){
        orientationX = true;
    }
    var docEl = win.document.documentElement,tid;
    function refreshRem1(){
        g_rem = docEl.getBoundingClientRect().width / 10;
        !g_rem && (g_rem = 20);
        // PC端打开，超过1024的话，就将屏幕宽度设为677px
        if( g_rem > 102.4 ){
            g_rem = 67.7;
        }
        docEl.style.fontSize = g_rem + 'px';
    }
    function refreshRem2(){
        g_rem = docEl.getBoundingClientRect().width/10;
        if(!g_rem){
            return refreshRem1();
        }
        // PC端打开，超过1024的话，就将屏幕宽度设为677px
        if( g_rem > 102.4 ){
            g_rem = 67.7;
        }
        var width = docEl.getBoundingClientRect().width;
        var d = win.document.createElement('div');
        d.style.width = '1rem';
        d.style.display = "none";
        docEl.firstElementChild.appendChild(d);
        var defaultFontSize = parseFloat(window.getComputedStyle(d, null).getPropertyValue('width'));
        docEl.firstElementChild.removeChild(d);
        docEl.style.fontSize = (g_rem/defaultFontSize)*100 + '%';
    }
    var refreshRem = /vivo(?!\s?x23)|HUAWEI|OPPO|ONEPLUS A5000/i.test(navigator.userAgent) && !/HUAWEIHMA-AL00/i.test(navigator.userAgent) ? refreshRem2 : refreshRem1;// 华为mate20不能用方案二。。。
    try{
        win.addEventListener("orientationchange", function() {//触发手机横屏竖屏事件
            if(orientationX){
                location.reload();
            }
        }, false);
    }catch(e){}
    win.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            clearTimeout(tid);
            tid = setTimeout(refreshRem, 100);
        }
    }, false);
    refreshRem();
})(window);
// 下面这段代码，主要是为了防止用户调整微信浏览器字体大小导致的rem异常。
(function(){
    if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function"){
        handleFontSize();
    }else{
        if (document.addEventListener){
            document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
        }else if(document.attachEvent){
            //IE浏览器，非W3C规范
            document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
        }
    }
    function handleFontSize(){
        // 设置网页字体为默认大小
        WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
        // 重写设置网页字体大小的事件
        WeixinJSBridge.on('menu:setfont', function(){
            WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize': 0 });
        });
    }
})();
