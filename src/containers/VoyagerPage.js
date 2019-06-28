import React from "react";
import { withRouter } from "react-router-dom";
import SchemaVoyager from '../components/SchemaVoyager'
import { Container } from 'semantic-ui-react'

const VoyagerPage = () => (
  <Container fluid style={{
    paddingLeft: '2em',
    paddingRight: '2em'
  }} >
    <SchemaVoyager />
  </Container>
);

export default withRouter(VoyagerPage);
