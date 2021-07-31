import { Router } from 'express'

export declare namespace Server {
  interface IRoute {
    name: string,
    router: Router
  }
}

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

export declare namespace API {
  interface Response {
    message: string | null
    success: boolean
    status: number
    result: any
  }
}
