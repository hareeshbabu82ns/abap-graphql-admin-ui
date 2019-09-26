import React from 'react';
import { Route, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { useQuery } from "react-apollo";
import {
  Segment, Container, Menu, Icon, Dropdown,
  Breadcrumb
} from 'semantic-ui-react'
import TypeDetails from '../components/TypeDetails'
import TypeSearch from '../components/TypeSearch'
import utils from '../utils/utils'
import { GET_TYPE_BY_ID } from '../utils/gql_queries_type'
import { GET_SCHEMA_BY_ID } from '../utils/gql_queries_schema'

const TypePage = ({ history }) => {
  const segments = utils.getPathSegments(history.location.pathname)
  console.log('segments', segments)
  const schemaId = segments.schema;
  const typeId = segments.type;
  const currentOperation = segments.operation;

  const resType = useQuery(GET_TYPE_BY_ID, {
    variables: {
      typeInput:
        { guid: typeId }
    }
  });
  const resSchema = useQuery(GET_SCHEMA_BY_ID, {
    variables: {
      schemaInput:
        { guid: schemaId }
    }
  });

  return (
    <Container fluid style={{
      paddingLeft: '2em',
      paddingRight: '2em'
    }} >
      <Menu attached='top'>
        <Menu.Item color='teal' active={true}>Type</Menu.Item>
        <Menu.Item>
          {currentOperation !== 'new' &&
            <Breadcrumb>
              {!resSchema.loading && !resSchema.error &&
                <React.Fragment>
                  <Breadcrumb.Section link as={NavLink}
                    to={utils.buildPathWithSegments({ schema: schemaId }, 'edit')}
                  >
                    {resSchema.data.schema[0].name}
                  </Breadcrumb.Section>
                  <Breadcrumb.Divider>/</Breadcrumb.Divider>
                </React.Fragment>}
              {!resType.loading && !resType.error && <Breadcrumb.Section active>{resType.data.type[0].name}</Breadcrumb.Section>}
            </Breadcrumb>
          }
        </Menu.Item>
        <Menu.Menu position='right'>
          <Menu.Item name='search'
            active={currentOperation === 'search'}
            onClick={(e, { value }) => {
              history.push(utils.buildPathWithSegments(segments, 'search'))
            }}><Icon name='search' />
          </Menu.Item>
          <Menu.Item name='edit'
            active={currentOperation === 'edit'}
            onClick={(e, { value }) => {
              history.push(utils.buildPathWithSegments(segments, 'edit'))
            }}><Icon name='edit' />
          </Menu.Item>

          <Dropdown item icon='file outline' simple>
            <Dropdown.Menu>
              <Dropdown.Item as={NavLink} active={currentOperation === 'new'}
                to={utils.buildPathWithSegments({ schema: schemaId }, 'type/_/new')}
              >Type</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item as={NavLink}
                to={utils.buildPathWithSegments(segments, 'field/_/new')}
              >
                Field</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
      </Menu>
      <Segment attached='bottom' >
        <Route path={`/schema/:id/type/_/new`} component={TypeDetails} exact />
        <Route path={`/schema/:id/type/:typeid/edit`} component={TypeDetails} exact />
        <Route path={`/schema/:id/type/:typeid/search`} component={TypeSearch} exact />
      </Segment>
    </Container >
  );
}
export default withRouter(TypePage);
