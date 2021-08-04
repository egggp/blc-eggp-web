import { model } from 'dynamoose'
import { DocumentModel } from '~/types/documentModel.type'
import { QuestionSchema } from '~/api/schema/question.schema'

export default model<DocumentModel.Question>('blg.eggp.question', QuestionSchema)
