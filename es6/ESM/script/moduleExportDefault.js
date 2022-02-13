// moduleExportDefault
import { changeA } from './moduleTest.mjs'

const default_a = 'foo'
changeA()

export default {
  default_a,
}
