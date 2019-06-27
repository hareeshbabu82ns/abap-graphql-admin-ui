import React from "react";
import { withRouter } from "react-router-dom";
import SchemaEditor from '../components/SchemaEditor'
import { Container } from 'semantic-ui-react'

const GraphqlEditorPage = () => (
  <Container fluid style={{
    paddingLeft: '2em',
    paddingRight: '2em'
  }} >
    <SchemaEditor />
  </Container>
);

export default withRouter(GraphqlEditorPage);
