import dynamoose from 'dynamoose'
import { ImageInfoSchema } from '~/api/schema/image.schema'

export const SelectionSchema = new dynamoose.Schema({
  title: String,
  description: String,
  selectRate: Number,
  image: {
    type: Object,
    schema: ImageInfoSchema
  }
})

export const AdditionalInfoSchema = new dynamoose.Schema({
  commentSize: Number,
  goodRate: Number,
  badRate: Number,
  viewRate: Number
})

export const QuestionSchema = new dynamoose.Schema({
  itemKey: {
    type: String,
    hashKey: true
  },
  title: {
    type: String,
    index: {
      global: true,
      name: 'titleIndex'
    }
  },
  itemA: {
    type: Object,
    schema: SelectionSchema
  },
  itemB: {
    type: Object,
    schema: SelectionSchema
  },
  additionalInfo: {
    type: Object,
    schema: AdditionalInfoSchema
  },
  tags: {
    type: Array,
    schema: [String]
  }
}, {
  timestamps: {
    createdAt: ['createdAt'],
    updatedAt: ['updatedAt']
  }
})
