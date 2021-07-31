import { ddb } from '~/api/helpers/aws'

const TableName = 'blc.eggp.hello'

export function createTable () {
  const params = {
    TableName,
    KeySchema: [
      { AttributeName: 'itemKey', KeyType: 'HASH' }
    ],
    AttributeDefinitions: [
      { AttributeName: 'itemKey', AttributeType: 'S' },
      { AttributeName: 'userId', AttributeType: 'S' },
      { AttributeName: 'meetingKey', AttributeType: 'S' }
    ],
    GlobalSecondaryIndexes: [
      {
        IndexName: 'userIdIndex',
        KeySchema: [
          {
            AttributeName: 'userId',
            KeyType: 'HASH'
          }
        ],
        Projection: {
          ProjectionType: 'INCLUDE',
          NonKeyAttributes: ['userInfo', 'book', 'createdAt', 'likey', 'imageUrl', 'articleItems', 'userId', 'meetingKey']
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      },
      {
        IndexName: 'meetingKeyIndex',
        KeySchema: [
          {
            AttributeName: 'meetingKey',
            KeyType: 'HASH'
          }
        ],
        Projection: {
          ProjectionType: 'INCLUDE',
          NonKeyAttributes: ['userInfo', 'book', 'createdAt', 'likey', 'imageUrl', 'articleItems', 'userId', 'meetingKey']
        },
        ProvisionedThroughput: {
          ReadCapacityUnits: 1,
          WriteCapacityUnits: 1
        }
      }
    ],
    ProvisionedThroughput: {
      ReadCapacityUnits: 1,
      WriteCapacityUnits: 1
    },
    Tags: [
      { Key: 'application', Value: 'blc' },
      { Key: 'group', Value: 'eggp' },
      { Key: 'tableName', Value: 'hello' }
    ]
  }

  return ddb.createTable(params).promise()
}
