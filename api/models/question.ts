import dynamoose from 'dynamoose'
import { DocumentModel } from '~/types/documentModel.type'
import { QuestionSchema } from '~/api/schema/question.schema'

const Question = dynamoose.model<DocumentModel.Question>('blg.eggp.question', QuestionSchema)

export default Question
