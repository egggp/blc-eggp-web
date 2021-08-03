import dynamoose from 'dynamoose'
import { DocumentModel } from '~/types/documentModel.type'
import { UserSchema } from '~/api/schema/user.schema'

const User = dynamoose.model<DocumentModel.User>('blg.eggp.user', UserSchema)

export default User
