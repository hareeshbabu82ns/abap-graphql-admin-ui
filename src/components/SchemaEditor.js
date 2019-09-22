import React from 'react'
import { Query } from "react-apollo";
import { Editor } from 'graphql-editor';
import { withRouter } from "react-router-dom";
import config from '../utils/config'
import { GET_SCHEMA_BY_ID } from '../utils/gql_queries_schema'

const SchemaDetails = ({ match }) => (
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

      return (
        <div className="geditor" >
          <Editor editorVisible={true}
            graphController={(controller) => {
              controller.getSchemaFromURL(`${config.baseUrl}${schema.path}?sap-client=${config.sapClient}`)
              // , 'Authorization:Basic RGV2ZWxvcGVyOkRvd24xb2Fk')
            }} />
        </div>
      );
    }}
  </Query>

);

export default withRouter(SchemaDetails)