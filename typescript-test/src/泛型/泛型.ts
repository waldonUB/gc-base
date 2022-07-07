function getState<T>(val: T): T {
  console.log(val)
  return val
}

function getProperty(obj: T, key: K) {
  return obj[key];
}

getState('waldon')
getState(1)
getState(false)
