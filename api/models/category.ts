import dynamoose from 'dynamoose'
import { DocumentModel } from '~/types/documentModel.type'

const schema = new dynamoose.Schema({
  value: String
}, {
  timestamps: {
    createdAt: ['createdAt'],
    updatedAt: ['updatedAt']
  }
})

const model = dynamoose.model<DocumentModel.Category>('blg.eggp.category', schema)

export default model
