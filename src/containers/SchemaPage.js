import React from 'react';
import { Route } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Button, Segment, Container, Menu, Icon } from 'semantic-ui-react'

import SchemaDropdown from '../components/SchemaDropdown'
import SchemaDetails from '../components/SchemaDetails'
import SchemaVoyager from '../components/SchemaVoyager'


const SchemaPage = ({ history }) => (
  <Container fluid style={{
    paddingLeft: '2em',
    paddingRight: '2em'
  }} >

    <Menu attached='top'>
      <SchemaDropdown />
      <Menu.Item>
        <Button.Group icon>
          <Button onClick={(e, { value }) => {
            const schemaIdRegex = /^(\/schema)\/((\S.*))(\/.*$)/g;
            const schemaId = history.location.pathname
              .replace(schemaIdRegex, '$2');
            history.push(`/schema/${schemaId}/edit`)
          }}><Icon name='edit' /></Button>
          <Button ><Icon name='trash' /></Button>
          <Button ><Icon name='file outline' /></Button>
        </Button.Group>
      </Menu.Item>

    </Menu>
    <Segment attached='bottom'>
      <Route path={`/schema/:id/graph`} component={SchemaVoyager} exact />
      <Route path={`/schema/:id/edit`} component={SchemaDetails} exact />
    </Segment>
  </Container>

)
export default withRouter(SchemaPage);
