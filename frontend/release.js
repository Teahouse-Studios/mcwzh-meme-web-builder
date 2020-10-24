require('dotenv').config()
const OSS = require('ali-oss')
const glob = require("glob")
const client = new OSS({
  region: "oss-cn-shanghai",
  bucket: process.env.AL_FE_BUCKET,
  accessKeyId: process.env.AL_FE_KEYID,
  accessKeySecret: process.env.AL_FE_SECRET
})

const {NodeSSH} = require('node-ssh')

const ssh = new NodeSSH()


async function start() {
  const prefix = 'dist/'
  let tasks = glob.sync(`${prefix}/**/*.*`).map(v => v.substr(prefix.length))
  for (let task of tasks) {
    let result = await client.put(`${process.env.PROJ_NAME}/${task}`, `${prefix}${task}`)
    console.log(result.url)
  }
  
  await ssh.connect({
    host: process.env.REMOTE_HOST,
    username: process.env.REMOTE_USER,
    password: process.env.REMOTE_PWD
  })
  await ssh.putFile("dist/index.html", process.env.REMOTE_PATH)
  
  console.log('done')
}

start()
