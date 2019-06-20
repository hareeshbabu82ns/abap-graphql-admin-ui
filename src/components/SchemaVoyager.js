import React from 'react'
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import { Voyager } from 'graphql-voyager';
import config from '../utils/config'

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

      function introspectionProvider(query) {
        return fetch(`${config.baseUrl}${schema.path}?sap-client=${config.sapClient}`, {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          // mode: 'no-cors',
          body: JSON.stringify({ query: query }),
        }).then(response => response.json());
      }

      return (
        <Voyager introspection={introspectionProvider}
          displayOptions={{ sortByAlphabet: true }}
          workerURI={process.env.PUBLIC_URL + '/voyager.worker.js'} />
      );
    }}
  </Query >

)

export default SchemaDetails