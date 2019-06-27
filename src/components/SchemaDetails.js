import React from 'react'
import { Query, Mutation } from "react-apollo";
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

const SchemaDetails = ({ match }) => (
  <Query query={GET_SCHEMA_BY_ID}
    variables={{
      schemaInput:
        { guid: match.params.id }
    }}>
    {({ loading, error, data }) => {
      console.log(JSON.stringify(match, null, 2))
      if (loading) return <p>Loading...</p>;
      if (error) return <p>Error Loading Schema List</p>;
      let schema = data.schema[0];
      return (
        <Mutation mutation={UPDATE_SCHEMA_BY_ID}>
          {(updateSchema, { data }) => (<SchemaForm schema={schema}
            onSubmit={(data) => {
              return updateSchema({ variables: { data, where: { guid: match.params.id } } })
            }} />)}
        </Mutation>

      );
    }}
  </Query>
)

export default SchemaDetails