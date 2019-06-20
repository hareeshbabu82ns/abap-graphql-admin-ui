import React from 'react';
import {
  Menu, Container,
  Icon, Image
} from 'semantic-ui-react'
import { NavLink } from "react-router-dom";
import logo from '../logo.svg';

const navbar = () => {
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
      </Container>
    </Menu>
  );
};

export default navbar;
