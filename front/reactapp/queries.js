/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getFighter = /* GraphQL */ `
  query GetFighter($id: ID!) {
    getFighter(id: $id) {
      id
      name
      count
      createdAt
      updatedAt
    }
  }
`;
export const listFighters = /* GraphQL */ `
  query ListFighters(
    $id: ID
    $filter: ModelFighterFilterInput
    $limit: Int
    $nextToken: String
    $sortDirection: ModelSortDirection
  ) {
    listFighters(
      id: $id
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      sortDirection: $sortDirection
    ) {
      items {
        id
        name
        count
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
