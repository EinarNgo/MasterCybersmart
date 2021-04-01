/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createModuler = /* GraphQL */ `
  mutation CreateModuler(
    $input: CreateModulerInput!
    $condition: ModelModulerConditionInput
  ) {
    createModuler(input: $input, condition: $condition) {
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
export const updateModuler = /* GraphQL */ `
  mutation UpdateModuler(
    $input: UpdateModulerInput!
    $condition: ModelModulerConditionInput
  ) {
    updateModuler(input: $input, condition: $condition) {
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
export const deleteModuler = /* GraphQL */ `
  mutation DeleteModuler(
    $input: DeleteModulerInput!
    $condition: ModelModulerConditionInput
  ) {
    deleteModuler(input: $input, condition: $condition) {
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
