import React from 'react'
import { Query } from "react-apollo";
import { Voyager } from 'graphql-voyager';
import { withRouter } from "react-router-dom";
import config from '../utils/config'
import { GET_SCHEMA_BY_ID } from '../utils/gql_queries_schema'


const SchemaVoyager = ({ match }) => (
  <Query query={GET_SCHEMA_BY_ID}
    variables={{
      schemaInput:
        { guid: decodeURIComponent(match.params.id) }
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
  </Query>
);

export default withRouter(SchemaVoyager)