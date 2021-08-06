import { Schema } from 'dynamoose'
import { ImageInfoSchema } from '~/api/schema/image.schema'

export const SelectionSchema = new Schema({
  title: String,
  description: String,
  selectRate: Number,
  image: {
    type: Object,
    schema: ImageInfoSchema
  }
})

export const AdditionalInfoSchema = new Schema({
  commentSize: Number,
  goodRate: Number,
  badRate: Number,
  viewRate: Number
})

export const QuestionSchema = new Schema({
  itemKey: {
    type: String,
    hashKey: true,
    required: true
  },
  title: {
    type: String,
    index: {
      global: true,
      name: 'titleIndex'
    },
    required: true
  },
  itemA: {
    type: Object,
    schema: SelectionSchema,
    required: true
  },
  itemB: {
    type: Object,
    schema: SelectionSchema,
    required: true
  },
  additionalInfo: {
    type: Object,
    schema: AdditionalInfoSchema,
    required: true
  },
  tags: {
    type: Array,
    schema: [String],
    required: true
  },
  image: {
    type: Object,
    schema: ImageInfoSchema
  }
}, {
  timestamps: {
    createdAt: ['createdAt'],
    updatedAt: ['updatedAt']
  }
})
