import { foo } from './module_a.js'
import { bar } from './module_b.js'
// import('./module_b.js')

import styles from '../../../res/css/module_home.css'

console.log(foo('测试foo'))
// console.log(`测试hash值`)
// console.log(bar())
;(function () {
  setTimeout(() => {
    const divElement = document.createElement('div')
    divElement.className = 'base2'
    divElement.innerText = 1
    document.body.appendChild(divElement)
  }, 3000)
})()
