import React from 'react'
import { Query, Mutation, graphql, compose } from "react-apollo";
import SchemaForm from './SchemaForm'
import { GET_SCHEMA_BY_ID, UPDATE_SCHEMA_BY_ID, CREATE_SCHEMA, DELETE_SCHEMA_BY_ID } from '../utils/gql_queries'


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
              return updateSchema({ variables: { data, where: { id: decodeURIComponent(match.params.id) } } })
            }}
            onDelete={(data) => {
              mutate({ mutation: DELETE_SCHEMA_BY_ID, variables: { id: decodeURIComponent(match.params.id) } })
              history.push(`/schema`)
            }} />)}
        </Mutation>
      ) :
        (
          <Mutation mutation={CREATE_SCHEMA}>
            {(createSchema, { data }) => (<SchemaForm schema={schema}
              onSubmit={(data) => {
                return createSchema({ variables: { data } }).then((result) => {
                  history.push(`/schema/${encodeURIComponent(result.data.createSchema[0].id)}/edit`)
                  return data
                })
              }} />)}
          </Mutation>
        );
    }}
  </Query>
)

export default compose(graphql(DELETE_SCHEMA_BY_ID))(SchemaDetails)