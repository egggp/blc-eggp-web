import { Media } from '~/types/media.type'

export declare namespace Model {
  interface Selection {
    title: string
    description: string
    selectRate: number
    image?: Media.ImageInfo
  }

  interface AdditionalInfo {
    commentSize: number
    goodRate: number
    badRate: number
    viewRate: number
  }

  interface Question {
    itemKey: string
    title: string
    tags: string[]
    itemA: Selection
    itemB: Selection,
    additionalInfo: AdditionalInfo
    image?: Media.ImageInfo
  }

  interface Category {
    value: string
  }

  interface Tag {
    text: string
    size: number
  }

  interface User {
    userId: string
    userName: string
    completed: boolean
    rules: Array<string>
    auth: string
    password?: string
    profileImage?: Media.ImageInfo
  }
}
