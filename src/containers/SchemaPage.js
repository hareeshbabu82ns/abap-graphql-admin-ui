import React from 'react';
import { Route, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Segment, Container, Menu, Icon, Dropdown } from 'semantic-ui-react'
import SchemaDetails from '../components/SchemaDetails'
import SchemaSearch from '../components/SchemaSearch'

const SchemaPage = ({ history }) => {
  const schemaIdRegex = /^(\/schema)\/(\S.*)(\/.*$)/g;
  const schemaId = decodeURIComponent(history.location.pathname
    .replace(schemaIdRegex, '$2'));
  const currentPathSegment = history.location.pathname
    .replace(schemaIdRegex, '$3');
  return (
    <Container fluid style={{
      paddingLeft: '2em',
      paddingRight: '2em'
    }} >

      <Menu attached='top'>
        <Menu.Item>
          {currentPathSegment.substring(1)}
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item name='search'
            active={currentPathSegment === '/search'}
            onClick={(e, { value }) => {
              history.push(`/schema/${encodeURIComponent(schemaId)}/search`)
            }}><Icon name='search' />
          </Menu.Item>
          <Menu.Item name='edit'
            active={currentPathSegment === '/edit'}
            onClick={(e, { value }) => {
              history.push(`/schema/${encodeURIComponent(schemaId)}/edit`)
            }}><Icon name='edit' />
          </Menu.Item>

          <Dropdown item icon='file outline' simple>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} to={`/schema/_/new`}>Schema</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={NavLink} to={`/schema/${encodeURIComponent(schemaId)}/type/new`}>Type</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      <Segment attached='bottom' >
        <Route path={`/schema/_/new`} component={SchemaDetails} exact />
        <Route path={`/schema/:id/edit`} component={SchemaDetails} exact />
        <Route path={`/schema/:id/search`} component={SchemaSearch} />
      </Segment>
    </Container>
  );
}
export default withRouter(SchemaPage);
