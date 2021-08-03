import { Media } from '~/types/media.type'

export declare namespace Model {
  interface Selection {
    title: string
    description: string
    selectRate: number
    image?: Media.Image
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
  }

  interface Category {
    value: string
  }

  interface Tag {
    text: string
    size: number
  }

  interface User {
    userKey: string
    password: string
    userId: string
    userName: string
    profileImage?: Media.Image
  }
}
