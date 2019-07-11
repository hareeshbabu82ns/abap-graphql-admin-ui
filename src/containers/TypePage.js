import React from 'react';
import { Route, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { Query } from "react-apollo";
import { Segment, Container, Menu, Icon, Dropdown } from 'semantic-ui-react'
import TypeDetails from '../components/TypeDetails'
import TypeSearch from '../components/TypeSearch'
import utils from '../utils/utils'
import { GET_TYPE_BY_ID } from '../utils/gql_queries_type'

const TypePage = ({ history }) => {
  const segments = utils.getPathSegments(history.location.pathname)
  console.log('segments', segments)
  const schemaId = segments.schema;
  const typeId = segments.type;
  const currentOperation = segments.operation;
  return (
    <Container fluid style={{
      paddingLeft: '2em',
      paddingRight: '2em'
    }} >

      <Menu attached='top'>
        <Menu.Item>
          Type:&nbsp;
          {currentOperation !== 'new' && <Query query={GET_TYPE_BY_ID}
            variables={{
              typeInput:
                { guid: typeId }
            }}>
            {({ loading, error, data }) => {
              if (loading) return 'Loading...';
              if (error) return 'Error Loading Type';
              return data.type[0].name
            }}
          </Query>}
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
    </Container>
  );
}
export default withRouter(TypePage);
