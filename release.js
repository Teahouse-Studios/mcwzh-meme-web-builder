require('dotenv').config()
const OSS = require('ali-oss')
const glob = require("glob")
async function start() {
  const client = new OSS({
    region: process.env.AL_FE_REGION,
    bucket: process.env.AL_FE_BUCKET,
    accessKeyId: process.env.AL_FE_KEYID,
    accessKeySecret: process.env.AL_FE_SECRET
  })
  
  const prefix = 'dist/'
  let tasks = glob.sync(`${prefix}/**/*.*`).map(v => v.substr(prefix.length))
  for (let task of tasks) {
    let result = await client.put(`${process.env.PROJ_NAME}/${task}`, `${prefix}${task}`)
    console.log(result.url)
  }
  
  const client2 = new OSS({
    region: process.env.AL_FE_REGION,
    bucket: process.env.AL_BUCKET,
    accessKeyId: process.env.AL_FE_KEYID,
    accessKeySecret: process.env.AL_FE_SECRET
  })
  
  await client2.put('/index.html', __dirname + '/dist/index.html')
  console.log('done')
}

start()
