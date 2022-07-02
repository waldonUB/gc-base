// ### 第 104 题：模拟 localStorage 时如何实现过期时间功能

// 公司：阿里

// 解析：[第 104 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/171)

/*
  - 可以在存储值中加一个时间去计算当前日期和过期时间
*/

// waldon: 也可以使用多一个字段，expires

!window.localStorage &&
  !(function (win) {
    var thousandYears = 1e3 * 365 * 24 * 36e5

    function getCookies() {
      return document.cookie.match(/([^;=]+)=([^;]+)/g) || []
    }

    function getExpires(flag) {
      flag = flag || 1

      return 'expires=' + new Date(+new Date() + thousandYears * flag).toUTCString()
    }

    function get(key) {
      var cookies = getCookies()

      for (var i = 0; i < cookies.length; i++) {
        var param = cookies[i].match(/^\s*([^=]+)=(.+)/)

        if (param[1] === String(key)) {
          return decodeURIComponent(param[2])
        }
      }

      return null
    }

    function set(key, value, isExpired) {
      document.cookie = [
        key + '=' + encodeURIComponent(value),
        getExpires(isExpired ? -1 : 1),
        'path=/',
      ].join('; ')
    }

    function remove(key) {
      set(key, '', true)
    }

    function clear() {
      var cookies = getCookies()

      for (var i = 0; i < cookies.length; i++) {
        var key = cookies[i].match(/^\s*([^=]+)/)[1]
        remove(key)
      }
    }

    // 注册到 window 对象上
    win.localStorage = {
      getItem: get,
      setItem: set,
      removeItem: remove,
      clear: clear,
    }
  })(window)
