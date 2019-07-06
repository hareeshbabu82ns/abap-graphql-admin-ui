import React, { useState } from 'react'
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
// import _ from 'lodash'
import { Dropdown } from 'semantic-ui-react'
import { GET_SCHEMA_LIST } from '../utils/gql_queries'

const SchemaDropdown = ({ history }) => {
  const schemaIdRegex = /^(\/schema)\/(\S.*)(\/.*$)/g;
  const schemaId = history.location.pathname.replace(schemaIdRegex, '$2');
  const [schema, setSchema] = useState(decodeURIComponent(schemaId) || '');
  return (
    <Query query={GET_SCHEMA_LIST}>
      {({ loading, error, data }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error Loading Schema List</p>;

        const options = data.schema.map(({ id, name, description }) => (
          { key: id, text: name, value: id }));
        return <Dropdown
          item
          options={options}
          search
          value={schema}
          placeholder='Select Schema'
          onChange={(e, { value }) => {
            console.log(value)
            setSchema(value)
            history.push(`/schema/${encodeURIComponent(value)}/edit`)
          }}
        />
      }}
    </Query>
  )
}

export default withRouter(SchemaDropdown)