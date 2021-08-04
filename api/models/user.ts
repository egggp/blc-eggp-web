import { model } from 'dynamoose'
import { DocumentModel } from '~/types/documentModel.type'
import { UserSchema } from '~/api/schema/user.schema'

export default model<DocumentModel.User>('blg.eggp.user', UserSchema)
