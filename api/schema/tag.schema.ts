import dynamoose from 'dynamoose'

export const TagSchema = new dynamoose.Schema({
  text: String,
  size: Number
})
