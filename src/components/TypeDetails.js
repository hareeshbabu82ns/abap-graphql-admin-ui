import React from 'react'
import { Query, Mutation, graphql, compose } from "react-apollo";
import TypeForm from './TypeForm'
import { GET_TYPE_BY_ID, UPDATE_TYPE_BY_ID, CREATE_TYPE, DELETE_TYPE_BY_ID } from '../utils/gql_queries_type'
import utils from '../utils/utils'

const TypeDetails = ({ history, match, mutate }) => (
  <Query query={GET_TYPE_BY_ID}
    variables={{
      typeInput:
        { guid: decodeURIComponent(match.params.typeid) }
    }}>
    {({ loading, error, data }) => {
      const segments = utils.getPathSegments(history.location.pathname)
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error Loading Type List</p>;
      let type = match.params.typeid ? data.type[0] : { name: '', description: '', path: '' };
      return match.params.typeid ? (
        <Mutation mutation={UPDATE_TYPE_BY_ID}>
          {(updateType, { data }) => (<TypeForm type={type}
            onSubmit={(data) => {
              return updateType({ variables: { data, where: { guid: segments.type } } })
            }}
            onDelete={(data) => {
              mutate({ mutation: DELETE_TYPE_BY_ID, variables: { id: segments.type } })
              history.goBack()
            }} />)}
        </Mutation>
      ) :
        (
          <Mutation mutation={CREATE_TYPE}>
            {(createType, { data }) => (<TypeForm type={type}
              onSubmit={(data) => {
                return createType({ variables: { data: { ...data, rootSchema: segments.schema } } }).then((result) => {
                  history.push(utils.buildPathWithSegments({ ...segments, type: result.data.createType[0].id }, `edit`))
                  return data
                })
              }} />)}
          </Mutation>
        );
    }}
  </Query>
)

export default compose(graphql(DELETE_TYPE_BY_ID))(TypeDetails)