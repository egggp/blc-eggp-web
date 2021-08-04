import { Schema } from 'dynamoose'
import { ImageInfoSchema } from '~/api/schema/image.schema'

export const UserSchema = new Schema({
  userId: {
    type: String,
    hashKey: true
  },
  password: String,
  userName: String,
  completed: Boolean,
  profileImage: {
    type: Object,
    schema: ImageInfoSchema
  }
})
