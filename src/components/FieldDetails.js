import React from 'react'
import { Query, Mutation, graphql } from "react-apollo";
import { flowRight as compose } from 'lodash';
import FieldForm from './FieldForm'
import { GET_FIELD_BY_ID, UPDATE_FIELD_BY_ID, CREATE_FIELD, DELETE_FIELD_BY_ID } from '../utils/gql_queries_field'
import utils from '../utils/utils'

const FieldDetails = ({ history, match, mutate }) => (
  <Query query={GET_FIELD_BY_ID}
    variables={{
      fieldInput:
        { guid: decodeURIComponent(match.params.fieldid) }
    }}>
    {({ loading, error, data }) => {
      const segments = utils.getPathSegments(history.location.pathname)
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error Loading Field List</p>;
      let field = match.params.fieldid ? data.field[0] : { name: '', description: '', abapName: '', type: '', customType: '' };
      return match.params.fieldid ? (
        <Mutation mutation={UPDATE_FIELD_BY_ID}>
          {(updateField, { data }) => (<FieldForm field={field}
            onSubmit={(data) => {
              let { id, __typename, ...updateData } = data;
              return updateField({ variables: { data: updateData, where: { guid: segments.field } } })
            }}
            onDelete={(data) => {
              mutate({ mutation: DELETE_FIELD_BY_ID, variables: { id: segments.field } })
              history.goBack()
            }} />)}
        </Mutation>
      ) :
        (
          <Mutation mutation={CREATE_FIELD}>
            {(createField, { data }) => (<FieldForm field={field}
              onSubmit={(data) => {
                return createField({ variables: { data: { ...data, rootSchema: segments.schema } } }).then((result) => {
                  history.push(utils.buildPathWithSegments({ ...segments, field: result.data.createField[0].id }, `edit`))
                  return data
                })
              }} />)}
          </Mutation>
        );
    }}
  </Query>
)

export default compose(graphql(DELETE_FIELD_BY_ID))(FieldDetails)