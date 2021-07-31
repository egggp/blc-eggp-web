import AWS from 'aws-sdk'

const region = 'ap-northeast-2'
const profile = 'eggp'

const credentials = new AWS.SharedIniFileCredentials({ profile })

AWS.config.update({ region })
AWS.config.credentials = credentials

export const s3 = new AWS.S3()
export const ddb = new AWS.DynamoDB()
export const documentClient = new AWS.DynamoDB.DocumentClient()
