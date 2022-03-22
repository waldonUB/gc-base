let count = 3
export function incCount() {
  console.log('esm this', this)
  count++
}

export default {
  count,
  incCount,
}
