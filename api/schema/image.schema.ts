import dynamoose from 'dynamoose'

export const ImageSchema = new dynamoose.Schema({
  name: String,
  mimetype: String,
  size: Number,
  url: String
})

export const ImageInfoSchema = new dynamoose.Schema({
  original: ImageSchema,
  low: ImageSchema,
  thumbnail: ImageSchema
})
