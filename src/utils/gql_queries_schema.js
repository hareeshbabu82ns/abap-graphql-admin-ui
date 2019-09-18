import { gql } from "apollo-boost";

const GET_SCHEMA_LIST = gql`
  {
    schema{
      id:guid
      name
      description
      path
    }
  }
`;

const GET_SCHEMA_BY_ID = gql`
  query schema($schemaInput:SchemaWhereInput!){
    schema(where:$schemaInput){
      id:guid
      name
      description
      path
    }
  }
`;

const UPDATE_SCHEMA_BY_ID = gql`
mutation UpdateSchema($data: SchemaUpdateDataInput!,
			$where: SchemaWhereInput!){
    updateSchema(with:$data, where: $where){
      id:guid
      name
      description
      path
    }
  }
`;
const CREATE_SCHEMA = gql`
mutation CreateSchema($data: SchemaInput!){
    createSchema(with:[$data]){
      id:guid
      name
      description
      path
    }
  }
`;
const DELETE_SCHEMA_BY_ID = gql`
mutation DeleteSchema($id: ID!){
    deleteSchema(where:{guid:$id}){
      id:guid
    }
  }
`;
const SEARCH_SCHEMA_FOR_TYPES_FIELDS_BY_NAME = gql`
query search($typesWhere:TypeWhereInput!,
  	$fieldsWhere: FieldWhereInput!){
  types: type(where:$typesWhere){
    id:guid
    name
    kind
    abapName
    description
  }
  fields: field(where:$fieldsWhere){
    id:guid
    name
    abapName
    description
    type
    resolver
    customType
    parentType{
      id:guid
      name
    }
    parentField{
      id:guid
      name
      parentType{
        id:guid
        name
      }
    }
  }
}
`;
const GET_ENUM_VALUES_BY_NAME = gql`
query search($enumName: String!){
  __type(name:$enumName){
    enumValues{
      name
    }
  }
}
`;
const GET_SCHEMA_TYPES = gql`
query{
  __schema{
    types{
      name
      kind
    }
  }
}
`;
export {
  GET_SCHEMA_LIST, GET_SCHEMA_BY_ID,
  UPDATE_SCHEMA_BY_ID, CREATE_SCHEMA, DELETE_SCHEMA_BY_ID,
  SEARCH_SCHEMA_FOR_TYPES_FIELDS_BY_NAME,
  GET_ENUM_VALUES_BY_NAME, GET_SCHEMA_TYPES
};