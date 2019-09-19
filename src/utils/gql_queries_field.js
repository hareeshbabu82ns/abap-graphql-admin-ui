import { gql } from "apollo-boost";

const GET_FIELD_LIST = gql`
  {
    field{
      id:guid
      name
      description
      path
    }
  }
`;

const GET_FIELD_BY_ID = gql`
  query field($fieldInput:FieldWhereInput!){
    field(where:$fieldInput){
      id:guid
      name
      description
      abapName
      type
      customType
      isNonNull
      isList
      isNonNullList
      hasArguments
      isArgument
      resolver
      defaultValue
      isEnum
      rootSchema
    }
  }
`;

const UPDATE_FIELD_BY_ID = gql`
mutation UpdateField($data: FieldUpdateDataInput!,
			$where: FieldWhereInput!){
    updateField(with:$data, where: $where){
      id:guid
      name
      description
      abapName
      type
      customType
      isNonNull
      isList
      isNonNullList
      hasArguments
      isArgument
      resolver
      defaultValue
      isEnum
    }
  }
`;
const CREATE_FIELD = gql`
mutation CreateField($data: FieldInput!){
    createField(with:[$data]){
      id:guid
      name
      description
      abapName
      type
      customType
      isNonNull
      isList
      isNonNullList
      hasArguments
      isArgument
      resolver
      defaultValue
      isEnum
    }
  }
`;
const DELETE_FIELD_BY_ID = gql`
mutation DeleteField($id: ID!){
    deleteField(where:{guid:$id}){
      id:guid
    }
  }
`;
const SEARCH_FIELD_FOR_FIELDS_BY_NAME = gql`
query search($fieldsWhere: FieldWhereInput!){
  fields: field(where:$fieldsWhere){
    id:guid
    name
    abapName
    description
    field
    resolver
    customField
    fieldField{
      id:guid
    }
  }
}
`;
export {
  GET_FIELD_BY_ID, UPDATE_FIELD_BY_ID, CREATE_FIELD, DELETE_FIELD_BY_ID, SEARCH_FIELD_FOR_FIELDS_BY_NAME,
};