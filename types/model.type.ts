export declare namespace Model {
  interface Question {
    itemKey: string
    title: string
    description: string
    category: string
    tags: string[]
  }

  interface Category {
    value: string
  }

  interface Tag {
    itemKey: string
    value: string
  }
}
