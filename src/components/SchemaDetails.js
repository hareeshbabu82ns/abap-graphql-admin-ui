import React from 'react'
import { Query, Mutation, graphql, compose } from "react-apollo";
import { gql } from "apollo-boost";
import SchemaForm from './SchemaForm'


const GET_SCHEMA_BY_ID = gql`
  query schema($schemaInput:SchemaWhereInput!){
    schema(where:$schemaInput){
      guid
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
      guid
      name
      description
      path
    }
  }
`;
const CREATE_SCHEMA = gql`
mutation CreateSchema($data: SchemaInput!){
    createSchema(with:[$data]){
      guid
      name
      description
      path
    }
  }
`;
const DELETE_SCHEMA_BY_ID = gql`
mutation DeleteSchema($id: ID!){
    deleteSchema(where:{guid:$id}){
      guid
    }
  }
`;
const SchemaDetails = ({ history, match, mutate }) => (
  <Query query={GET_SCHEMA_BY_ID}
    variables={{
      schemaInput:
        { guid: match.params.id }
    }}>
    {({ loading, error, data }) => {

      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error Loading Schema List</p>;
      let schema = match.params.id ? data.schema[0] : { name: '', description: '', path: '' };
      return match.params.id ? (
        <Mutation mutation={UPDATE_SCHEMA_BY_ID}>
          {(updateSchema, { data }) => (<SchemaForm schema={schema}
            onSubmit={(data) => {
              return updateSchema({ variables: { data, where: { guid: decodeURIComponent(match.params.id) } } })
            }}
            onDelete={(data) => {
              mutate({ variables: { id: decodeURIComponent(match.params.id) } })
              history.push(`/schema`)
            }} />)}
        </Mutation>
      ) :
        (
          <Mutation mutation={CREATE_SCHEMA}>
            {(createSchema, { data }) => (<SchemaForm schema={schema}
              onSubmit={(data) => {
                return createSchema({ variables: { data } }).then((result) => {
                  history.push(`/schema/${encodeURIComponent(result.data.createSchema[0].guid)}/edit`)
                  return data
                })
              }} />)}
          </Mutation>
        );
    }}
  </Query>
)

export default compose(graphql(DELETE_SCHEMA_BY_ID))(SchemaDetails)