import { foo } from './module_a.js'
import { bar } from './module_b.js'
// import('./module_b.js')
import('./module_c.js')
import('./module_c1.js')
import('./module_c2.js')
import('./module_c3.js')
import('./module_c4.js')

import styles from '../../../res/css/module_home.css'
;(function () {
  console.log(foo('测试foo'))
  setTimeout(() => {
    const divElement = document.createElement('div')
    divElement.className = 'base2'
    divElement.innerText = '1236测试22'
    document.body.appendChild(divElement)
    console.log(111122)
  }, 3000)
})()
