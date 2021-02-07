/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createCtf = /* GraphQL */ `
  mutation CreateCtf(
    $input: CreateCtfInput!
    $condition: ModelCtfConditionInput
  ) {
    createCtf(input: $input, condition: $condition) {
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
export const updateCtf = /* GraphQL */ `
  mutation UpdateCtf(
    $input: UpdateCtfInput!
    $condition: ModelCtfConditionInput
  ) {
    updateCtf(input: $input, condition: $condition) {
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
export const deleteCtf = /* GraphQL */ `
  mutation DeleteCtf(
    $input: DeleteCtfInput!
    $condition: ModelCtfConditionInput
  ) {
    deleteCtf(input: $input, condition: $condition) {
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
