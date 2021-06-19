require('dotenv').config()
const AWS = require('aws-sdk')
const glob = require("glob")
const mime = require('mime-types')
const fs = require('fs')

async function start() {
  const s3 = new AWS.S3({
    accessKeyId: process.env.AL_FE_KEYID,
    secretAccessKey: process.env.AL_FE_SECRET,
    endpoint: `https://${process.env.AL_FE_REGION}.aliyuncs.com`
  })
  
  const prefix = 'dist/'
  let tasks = glob.sync(`${prefix}/**/*.*`).map(v => v.substr(prefix.length))
  for (let task of tasks) {
    await s3.putObject({
      Key: `${process.env.PROJ_NAME}/${task}`,
      Body: fs.createReadStream(require('path').resolve(__dirname, prefix, task)),
      Bucket: process.env.AL_FE_BUCKET,
      ContentType: mime.lookup(task)
    }).promise()
    console.log(task)
  }
  console.log('done')
}

start()
