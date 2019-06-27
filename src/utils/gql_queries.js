import { gql } from "apollo-boost";

const GET_SCHEMA_LIST = gql`
  {
    schema{
      guid
      name
      description
      path
    }
  }
`;
export { GET_SCHEMA_LIST };