import React from 'react';
import { Route, NavLink } from "react-router-dom";
import { Query } from "react-apollo";
import { withRouter } from "react-router-dom";
import { Segment, Container, Menu, Icon, Dropdown } from 'semantic-ui-react'
import SchemaDetails from '../components/SchemaDetails'
import SchemaSearch from '../components/SchemaSearch'
import utils from '../utils/utils'
import { GET_SCHEMA_BY_ID } from '../utils/gql_queries_schema'

const SchemaPage = ({ history }) => {
  const segments = utils.getPathSegments(history.location.pathname)
  console.log('segments', segments)
  const schemaId = segments.schema;
  const currentOperation = segments.operation;
  return (
    <Container fluid style={{
      paddingLeft: '2em',
      paddingRight: '2em'
    }} >

      <Menu attached='top'>
        <Menu.Item color='teal' active={true}>Schema</Menu.Item>
        <Menu.Item>
          {currentOperation !== 'new' && <Query query={GET_SCHEMA_BY_ID}
            variables={{
              schemaInput:
                { guid: schemaId }
            }}>
            {({ loading, error, data }) => {
              if (loading) return <p className="ui active inline loader mini"></p>;
              if (error) return 'Error Loading Schema';
              return data.schema[0].name
            }}
          </Query>}
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item name='search'
            active={currentOperation === 'search'}
            onClick={(e, { value }) => {
              history.push(`/schema/${encodeURIComponent(schemaId)}/search`)
            }}><Icon name='search' />
          </Menu.Item>
          <Menu.Item name='edit'
            active={currentOperation === 'edit'}
            onClick={(e, { value }) => {
              history.push(`/schema/${encodeURIComponent(schemaId)}/edit`)
            }}><Icon name='edit' />
          </Menu.Item>

          <Dropdown item icon='file outline' simple>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} active={currentOperation === 'new'} to={`/schema/_/new`}>Schema</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={NavLink} to={`/schema/${encodeURIComponent(schemaId)}/type/_/new`}>Type</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      <Segment attached='bottom' >
        <Route path={`/schema/_/new`} component={SchemaDetails} exact />
        <Route path={`/schema/:id/edit`} component={SchemaDetails} exact />
        <Route path={`/schema/:id/search`} component={SchemaSearch} exact />
      </Segment>
    </Container>
  );
}
export default withRouter(SchemaPage);
