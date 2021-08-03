import { Schema } from 'dynamoose'
import { ImageInfoSchema } from '~/api/schema/image.schema'

export const UserSchema = new Schema({
  userKey: {
    type: String,
    hashKey: true
  },
  userId: {
    type: String,
    index: {
      global: true,
      name: 'userIdIndex'
    }
  },
  password: String,
  userName: String,
  completed: Boolean,
  profileImage: {
    type: Object,
    schema: ImageInfoSchema
  }
})
