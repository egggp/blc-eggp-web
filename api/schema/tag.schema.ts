import { Schema } from 'dynamoose'

export const TagSchema = new Schema({
  text: String,
  size: Number
})
