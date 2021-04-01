/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncModulers = /* GraphQL */ `
  query SyncModulers(
    $filter: ModelModulerFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncModulers(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        kategori
        type
        sporsmaal
        fasit
        valgmuligheter
        vanskelighetsgrad
        antallfeil
        bilder
        points
        totalSolved
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getModuler = /* GraphQL */ `
  query GetModuler($id: ID!) {
    getModuler(id: $id) {
      id
      kategori
      type
      sporsmaal
      fasit
      valgmuligheter
      vanskelighetsgrad
      antallfeil
      bilder
      points
      totalSolved
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listModulers = /* GraphQL */ `
  query ListModulers(
    $filter: ModelModulerFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listModulers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        kategori
        type
        sporsmaal
        fasit
        valgmuligheter
        vanskelighetsgrad
        antallfeil
        bilder
        points
        totalSolved
      }
    }
  }
`;
