import dynamoose from 'dynamoose'
import { DocumentModel } from '~/types/documentModel.type'

const questionSchema = new dynamoose.Schema({
  itemKey: {
    type: String,
    hashKey: true
  },
  text: String
}, {
  timestamps: {
    createdAt: ['createdAt'],
    updatedAt: ['updatedAt']
  }
})

const Question = dynamoose.model<DocumentModel.Question>('blg.eggp.question', questionSchema)

export default Question
