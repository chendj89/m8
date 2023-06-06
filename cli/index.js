const https = require('https')
const { exec } = require('child_process')
const { startTimer, clearTimer } = require('./utils/loading')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0

function getGitRaw() {
  startTimer({
    msg: '☃️  开始请求github数据：'
  })
  https.get(
    'https://raw.githubusercontent.com/chendj89/install/master/index.json',
    (res) => {
      startTimer({
        msg: '🎉  请求数据成功！',
        abs:true // eslint-disable-line no-param-reassign, no-underscore-dangle, no-multi-
      })
      res.on('data', (data) => {
        let list = Object.values(JSON.parse(data.toString()).devDependencies).flat()
      })
    }
  )
}
getGitRaw()
// https
//   .get(
//     'https://raw.githubusercontent.com/chendj89/install/master/index.json',
//     (res) => {
//       console.log('状态码：', res.statusCode)
//       res.on('data', (data) => {
//         let list = Object.values(JSON.parse(data.toString())).flat()
//        install(list.join(' '))
//       })
//     }
//   )
//   .on('error', (e) => {
//     console.error(e)
//   })

// const install = (data) => {
//   console.log(`cnpm install -D ${data}`)
//   const loading = setInterval(() => {
//     process.stdout.write('.')
//   }, 100)
//   exec(`cnpm install -D ${data}`, (error, stdout, stderr) => {
//     // 清除加载动画
//     clearInterval(loading)
//     if (error) {
//       console.error(`执行出错: ${error}`)
//       return
//     }
//     console.log(`stdout: ${stdout}`)
//     console.error(`stderr: ${stderr}`)
//   })
// }
