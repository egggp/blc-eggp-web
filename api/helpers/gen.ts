import { v4 as uuid } from 'uuid'

export function generateKey () {
  return uuid().split('-').join('')
}
