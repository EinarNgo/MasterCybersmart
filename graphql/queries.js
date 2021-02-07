/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getCtf = /* GraphQL */ `
  query GetCtf($id: ID!) {
    getCtf(id: $id) {
      id
      name
      key
      points
      totalSolved
      createdAt
      updatedAt
    }
  }
`;
export const listCtfs = /* GraphQL */ `
  query ListCtfs(
    $filter: ModelCtfFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCtfs(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        key
        points
        totalSolved
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
