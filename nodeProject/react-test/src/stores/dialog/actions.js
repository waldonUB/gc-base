export const changeTextAsync = function (dispatch, getState) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('async')
    }, 2000)
  }).then((res) => {
    dispatch({
      type: 'CHANGE_TEXT',
      text: 'async: ' + Math.random(),
    })
  })
}
