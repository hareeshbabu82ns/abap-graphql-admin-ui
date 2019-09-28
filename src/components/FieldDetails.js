import React from 'react'
import { Query, Mutation, graphql, useQuery } from "react-apollo";
import _, { flowRight as compose } from 'lodash';
import FieldForm from './FieldForm'
import { GET_TYPE_BY_ID } from '../utils/gql_queries_type'
import { GET_FIELD_BY_ID, UPDATE_FIELD_BY_ID, CREATE_FIELD, DELETE_FIELD_BY_ID } from '../utils/gql_queries_field'
import utils from '../utils/utils'

const FieldDetails = ({ history, match, mutate }) => {
  const segments = utils.getPathSegments(history.location.pathname)

  const resType = useQuery(GET_TYPE_BY_ID, {
    variables: {
      typeInput:
        { guid: segments.type }
    }
  });

  const { loading, error, data } = useQuery(GET_FIELD_BY_ID, {
    variables: {
      fieldInput:
        { guid: decodeURIComponent(match.params.fieldid) }
    }
  })

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error Loading Field List</p>;
  let field = match.params.fieldid ? data.field[0] : {
    name: '', description: '',
    abapName: '', type: '', customType: '',
    isEnum: _.get(resType, 'data.type[0].kind', '') === 'ENUM',
    rootSchema: segments.schema
  };
  field.type = field.isEnum ? 'String' : '';

  return match.params.fieldid ? (
    <Mutation mutation={UPDATE_FIELD_BY_ID}>
      {(updateField, { data }) => (<FieldForm field={field}
        onSubmit={(data) => {
          let { id, __typename, ...updateData } = data;
          return updateField({
            variables: {
              data: {
                ...updateData,
                type: _.get(updateData, 'type', '').trim(),
                customType: _.get(updateData, 'customType', '').trim(),
              }, where: { guid: segments.field }
            }
          })
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
            return createField({
              variables: {
                data: {
                  ...data,
                  type: _.get(data, 'type', '').trim(),
                  customType: _.get(data, 'customType', '').trim(),
                  parentGuid: segments.type,
                  rootSchema: segments.schema
                }
              }
            }).then((result) => {
              history.push(utils.buildPathWithSegments({ ...segments, field: result.data.createField[0].id }, `edit`))
              return data
            })
          }} />)}
      </Mutation>
    );
};

export default compose(graphql(DELETE_FIELD_BY_ID))(FieldDetails)