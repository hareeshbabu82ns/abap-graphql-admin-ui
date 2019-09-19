import React, { useState } from 'react'
import { useQuery } from "react-apollo";
import { withRouter } from "react-router-dom";
// import _ from 'lodash'
import { Dropdown } from 'semantic-ui-react'
import { GET_SCHEMA_LIST } from '../utils/gql_queries_schema'
import utils from '../utils/utils'

const SchemaDropdown = ({ history }) => {
  // const schemaIdRegex = /^(\/schema)\/(\S.*)(\/.*$)/g;
  // const schemaId = history.location.pathname.replace(schemaIdRegex, '$2');
  const segments = utils.getPathSegments(history.location.pathname)
  const [schema, setSchema] = useState(segments.schema || '');
  const { loading, error, data } = useQuery(GET_SCHEMA_LIST);
  if (loading) return <p className="ui active inline loader mini"></p>;
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
      history.push(utils.buildPathWithSegments({ schema: value }, `edit`))
    }}
  />
}

export default withRouter(SchemaDropdown)