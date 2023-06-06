const https = require('https')
const { exec } = require('child_process')
const { startTimer, clearTimer } = require('./utils/loading')
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0
process.env.NODE_NO_WARNINGS = 1;

function getGitRaw() {
  startTimer({
    msg: '☃️  开始请求github数据：'
  })
  https.get(
    'https://raw.githubusercontent.com/chendj89/install/master/index.json',
    (res) => {
      startTimer({
        msg: '🎉  请求数据成功！',
        abs: true 
      })
      res.on('data', async (data) => {
        let oData = JSON.parse(data.toString())
        let devDependencies = Object.values(oData.devDependencies).flat()
        const script = oData.script
        await cmd({cmd:script.volta,msg:"指定node版本"})
        await cmd({cmd:`cnpm install -D ${devDependencies.join(' ')}`,msg:'安装依赖：'})
      })
    }
  )
}
getGitRaw()

const cmd = ({ cmd, msg = '' }) => {
  msg && startTimer({ msg })
  return new Promise((resolve) => {
    exec(cmd, (error, stdout, stderr) => {
      msg && clearTimer()
      console.log('\n' + stderr)
      resolve(true)
    })
  })
}
