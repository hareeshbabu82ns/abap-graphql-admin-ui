import React from 'react';
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Segment, Container, Menu, Icon, Input } from 'semantic-ui-react'
import SchemaDetails from '../components/SchemaDetails'
import SchemaSearch from '../components/SchemaSearch'

const SchemaPage = ({ history }) => {
  const schemaIdRegex = /^(\/schema)\/(\S.*)(\/.*$)/g;
  const schemaId = history.location.pathname
    .replace(schemaIdRegex, '$2');
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
              history.push(`/schema/${schemaId}/search`)
            }}><Icon name='search' />
          </Menu.Item>
          <Menu.Item name='edit'
            active={currentPathSegment === '/edit'}
            onClick={(e, { value }) => {
              history.push(`/schema/${schemaId}/edit`)
            }}><Icon name='edit' />
          </Menu.Item>
          <Menu.Item name='new'><Icon name='file outline' /></Menu.Item>
        </Menu.Menu>
      </Menu>
      <Segment attached='bottom' >
        <Route path={`/schema/:id/edit`} component={SchemaDetails} exact />
        <Route path={`/schema/:id/search`} component={SchemaSearch} />
      </Segment>
    </Container>
  );
}
export default withRouter(SchemaPage);
