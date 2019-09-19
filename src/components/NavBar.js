import React from 'react';
import {
  Menu, Container,
  Icon, Image
} from 'semantic-ui-react'
import { NavLink, withRouter } from "react-router-dom";
import logo from '../logo.svg';
import SchemaDropdown from './SchemaDropdown'
import utils from '../utils/utils'

const navbar = ({ history }) => {
  const segments = utils.getPathSegments(history.location.pathname)
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
              if (history.location.pathname === `/schema/${encodeURIComponent(segments.schema)}/graph`)
                history.goBack()
              else
                history.push(`/schema/${encodeURIComponent(segments.schema)}/graph`)
            }}
          />
          <Menu.Item
            name='Editor'
            active={/^(\/schema)\/((\S.*))(\/editor)/g.test(history.location.pathname)}
            onClick={(e, { value }) => {
              if (history.location.pathname === `/schema/${encodeURIComponent(segments.schema)}/editor`)
                history.goBack()
              else
                history.push(`/schema/${encodeURIComponent(segments.schema)}/editor`)
            }}
          />
        </Menu.Menu>
      </Container>
    </Menu>
  );
};

export default withRouter(navbar);
