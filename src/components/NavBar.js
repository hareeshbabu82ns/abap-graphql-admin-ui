import React from 'react';
import {
  Menu, Container,
  Icon, Image
} from 'semantic-ui-react'
import { NavLink, withRouter } from "react-router-dom";
import logo from '../logo.svg';
import SchemaDropdown from './SchemaDropdown'

const navbar = ({ history }) => {
  return (
    <Menu fixed='top' color="teal" inverted>
      <Container>
        <Menu.Item as='a' header>
          <Image size='mini' src={logo} style={{ marginRight: '1.5em' }} />
          GraphQL Admin
        </Menu.Item>
        <Menu.Item as={NavLink} to="/" exact>
          <Icon name="dashboard" />Dashboard
        </Menu.Item>
        <Menu.Item as={NavLink} to="/schema">
          <Icon name="schlix" />Schema
        </Menu.Item>
        <Menu.Menu position='right'>
          <SchemaDropdown />
          <Menu.Item
            name='Voyager'
            active={/^(\/schema)\/((\S.*))(\/graph)/g.test(history.location.pathname)}
            onClick={(e, { value }) => {
              const schemaIdRegex = /^(\/schema)\/((\S.*))(\/.*$)/g;
              const schemaId = history.location.pathname
                .replace(schemaIdRegex, '$2');
              if (history.location.pathname === `/schema/${schemaId}/graph`)
                // history.push(`/schema/${schemaId}/edit`)
                history.goBack()
              else
                history.push(`/schema/${schemaId}/graph`)
            }}
          />
          <Menu.Item
            name='Editor'
            active={/^(\/schema)\/((\S.*))(\/editor)/g.test(history.location.pathname)}
            onClick={(e, { value }) => {
              const schemaIdRegex = /^(\/schema)\/((\S.*))(\/.*$)/g;
              const schemaId = history.location.pathname
                .replace(schemaIdRegex, '$2');
              if (history.location.pathname === `/schema/${schemaId}/editor`)
                // history.push(`/schema/${schemaId}/edit`)
                history.goBack()
              else
                history.push(`/schema/${schemaId}/editor`)
            }}
          />
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default withRouter(navbar);
