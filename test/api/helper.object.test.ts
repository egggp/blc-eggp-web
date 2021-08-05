import {
  projection,
  reverseProjection
} from '~/api/helpers/object'

describe('helper.object', () => {
  const target = { hello: 'world', goodbye: 'see you' }

  test('reverseProjection', () => {
    const result = reverseProjection(target, ['goodbye'])
    expect(result).toStrictEqual({ hello: 'world' })
  })

  test('projection', () => {
    const result = projection(target, ['hello'])
    expect(result).toStrictEqual({ hello: 'world' })
  })
})
