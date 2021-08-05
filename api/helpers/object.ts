interface IObjectType {
  [key: string]: string
}
export function reverseProjection (obj: object, parameters: string[]) {
  const result: IObjectType = {}

  for (const [key, value] of Object.entries(obj)) {
    if (parameters.includes(key)) {
      continue
    }

    result[key] = value
  }

  return result
}

export function projection (obj: object, parameters: string[]) {
  const result: IObjectType = {}

  for (const [key, value] of Object.entries(obj)) {
    if (!parameters.includes(key)) {
      continue
    }

    result[key] = value
  }

  return result
}
