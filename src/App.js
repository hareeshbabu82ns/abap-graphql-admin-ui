import React from 'react';
import _ from 'lodash'

import { ApolloProvider } from 'react-apollo'
import './App.sass';

import AppRouter from "./routers/AppRouter";
import gqlClient, { prepareApolloClient } from './utils/GqlClient'
import { SchemaProvider } from './utils/schema_context'
import utils from './utils/utils'
import { GET_SCHEMA_BY_ID } from './utils/gql_queries_schema'

class App extends React.Component {

  constructor(props) {
    super(props);

    this.updateSchema = ({ guid, name, path }) => {
      this.setState(state => ({
        schema: { guid, name, path },
        client: prepareApolloClient({ apiPath: path })
      }));
    };

    this.state = {
      schema: {},
      client: undefined,
      updateSchema: this.updateSchema
    };

    // get selected schema from path
    const segments = utils.getPathSegments(window.location.pathname);
    console.log(segments);
    gqlClient.query({
      query: GET_SCHEMA_BY_ID,
      variables: { schemaInput: { guid: segments.schema } }
    }).then((res) => {
      const schema = _.get(res, 'data.schema[0]', {});
      if (schema.id) {
        this.setState(state => ({
          schema: { ...schema, guid: schema.id },
          client: prepareApolloClient({ apiPath: schema.path })
        }));
      }
    })
  }

  render() {
    return (
      <ApolloProvider client={gqlClient}>
        <SchemaProvider value={this.state}>
          <AppRouter />
        </SchemaProvider>
      </ApolloProvider>
    );
  }
}

export default App;
