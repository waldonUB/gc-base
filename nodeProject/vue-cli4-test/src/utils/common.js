import SparkMD5 from 'spark-md5'

export const calcFileMD5 = function (file) {
  return new Promise((resolve, reject) => {
    const chunkSize = 2097152 // 2M
    const chunks = Math.ceil(file.size / chunkSize)
    let currentChunk = 0
    const spark = new SparkMD5.ArrayBuffer()
    const fileReader = new FileReader()
    const loadNext = function () {
      let start = currentChunk * chunkSize
      const _end = start + chunkSize
      let end = _end >= file.size ? file.size : _end
      fileReader.readAsArrayBuffer(file.slice(start, end))
    }

    fileReader.onload = (e) => {
      spark.append(e.target.result)
      currentChunk++
      if (currentChunk < chunks) {
        loadNext()
      } else {
        resolve(spark.end())
      }
    }

    fileReader.onerror = (e) => {
      reject(fileReader.error)
      fileReader.abort()
    }

    loadNext()
  })
}

/**
 * 检查文件是否存在，也可以用于做文件秒传
 * @author waldon
 * @date 2022-03-06
 */
export const checkFileExist = function (url, name, md5) {}

/**
 * 检查文件是否存在，也可以用于做文件秒传
 * @author waldon
 * @date 2022-03-06
 */
export const g_upload = function (
  url,
  file,
  fileMD5,
  fileSize,
  chunkSize,
  chunkIds,
  poolLimit = 1,
) {
  const chunks = Math.ceil(fileSize / chunkSize)
  for (let i = 0; i < chunks; i++) {
    const start = i * chunkSize
    const end = i + 1 === chunks ? fileSize : (i + 1) * chunkSize
    const chunk = file.slice(start, end)
  }
}
