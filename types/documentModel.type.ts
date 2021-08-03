import { Document } from 'dynamoose/dist/Document'
import { Model } from './model.type'

export declare namespace DocumentModel {
  interface Question extends Model.Question, Document {}
  interface Category extends Model.Category, Document {}
  interface Tag extends Model.Tag, Document {}
  interface User extends Model.User, Document {}
}
