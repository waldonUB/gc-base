// const axios = require('axios')
function postTest() {
  fetch('form-post', {
    method: 'post',
    headers: {
      // 'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({
      testData: 'text',
    }),
  })
}
