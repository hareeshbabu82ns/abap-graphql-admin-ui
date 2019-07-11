import React from 'react'
import { Query, Mutation, graphql, compose } from "react-apollo";
import SchemaForm from './SchemaForm'
import { GET_SCHEMA_BY_ID, UPDATE_SCHEMA_BY_ID, CREATE_SCHEMA, DELETE_SCHEMA_BY_ID } from '../utils/gql_queries_schema'
import utils from '../utils/utils'

const SchemaDetails = ({ history, match, mutate }) => (
  <Query query={GET_SCHEMA_BY_ID}
    variables={{
      schemaInput:
        { guid: decodeURIComponent(match.params.id) }
    }}>
    {({ loading, error, data }) => {
      const schemaId = decodeURIComponent(match.params.id)
      if (loading) return <p className="ui active inline loader mini"></p>;
      if (error) return <p>Error Loading Schema List</p>;
      let schema = match.params.id ? data.schema[0] : { name: '', description: '', path: '' };
      return match.params.id ? (
        <Mutation mutation={UPDATE_SCHEMA_BY_ID}>
          {(updateSchema, { data }) => (<SchemaForm schema={schema}
            onSubmit={(data) => {
              return updateSchema({ variables: { data, where: { guid: schemaId } } })
            }}
            onDelete={(data) => {
              mutate({ mutation: DELETE_SCHEMA_BY_ID, variables: { id: schemaId } })
              history.push(`/schema`)
            }} />)}
        </Mutation>
      ) :
        (
          <Mutation mutation={CREATE_SCHEMA}>
            {(createSchema, { data }) => (<SchemaForm schema={schema}
              onSubmit={(data) => {
                return createSchema({ variables: { data } }).then((result) => {
                  history.push(utils.buildPathWithSegments({ schema: result.data.createSchema[0].id }, `edit`))
                  return data
                })
              }} />)}
          </Mutation>
        );
    }}
  </Query>
)

export default compose(graphql(DELETE_SCHEMA_BY_ID))(SchemaDetails)