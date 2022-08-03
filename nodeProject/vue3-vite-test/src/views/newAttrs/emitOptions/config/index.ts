// api
import { toRefs, ref } from 'vue'
export let randomVal = ref('')
export const getRandomValue = function (val: string) {
  randomVal.value = val
}
// emits: ['randomValue', 'click'] 因为在子组件声明了click，
// 所以会覆盖掉在组件上直接写的@click，并且不会触发两次
export const clickChild = function (val: any) {
  console.log('clickChild: ', val)
}
