import { gql } from "apollo-boost";

const GET_TYPE_LIST = gql`
  {
    type{
      id:guid
      name
      description
      path
    }
  }
`;

const GET_TYPE_BY_ID = gql`
  query type($typeInput:TypeWhereInput!){
    type(where:$typeInput){
      id:guid
      name
      description
      abapName
      kind
    }
  }
`;

const UPDATE_TYPE_BY_ID = gql`
mutation UpdateType($data: TypeUpdateDataInput!,
			$where: TypeWhereInput!){
    updateType(with:$data, where: $where){
      id:guid
      name
      description
      abapName
      kind
    }
  }
`;
const CREATE_TYPE = gql`
mutation CreateType($data: TypeInput!){
    createType(with:[$data]){
      id:guid
      name
      description
      abapName
      kind
    }
  }
`;
const DELETE_TYPE_BY_ID = gql`
mutation DeleteType($id: ID!){
    deleteType(where:{guid:$id}){
      id:guid
    }
  }
`;
const SEARCH_TYPE_FOR_FIELDS_BY_NAME = gql`
query search($fieldsWhere: FieldWhereInput!){
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
export {
  GET_TYPE_BY_ID, UPDATE_TYPE_BY_ID, CREATE_TYPE, DELETE_TYPE_BY_ID, SEARCH_TYPE_FOR_FIELDS_BY_NAME,
  GET_ENUM_VALUES_BY_NAME
};