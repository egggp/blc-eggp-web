export declare namespace Media {
  interface Media {
    id?: string
    name: string
    mimetype: string
    size: number
    url: string
  }

  interface Image extends Media {
  }

  interface VideoInfo extends Media {
  }

  interface Image {
    original: Image
    low: Image
    thumbnail: Image
  }
}
