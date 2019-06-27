import React, { useState } from 'react'
import { Query } from "react-apollo";
import { gql } from "apollo-boost";
import _ from 'lodash'
import queryString from 'querystring'
import { Segment, Dropdown, Menu, Icon, Input, Header, Card } from 'semantic-ui-react'

const SEARCH_SCHEMA_FOR_TYPES_FIELDS_BY_NAME = gql`
query search($typesWhere:TypeWhereInput!,
  	$fieldsWhere: FieldWhereInput!){
  types: type(where:$typesWhere){
    guid
    name
    kind
    abapName
    description
  }
  fields: field(where:$fieldsWhere){
    guid
    name
    abapName
    description
    type
    resolver
    customType
    parentType{
      guid
      name
    }
    parentField{
      guid
      name
      parentType{
        guid
        name
      }
    }
  }
}
`;

const options = [
  { key: 'all', text: 'All', value: 'all' },
  { key: 'types', text: 'Types', value: 'types' },
  { key: 'inputs', text: 'Input Types', value: 'inputs' },
  { key: 'enums', text: 'Enums', value: 'enums' },
  { key: 'fields', text: 'Fields', value: 'fields' },
]

const SchemaSearch = ({ history, match, searchInput }) => {
  const qs = queryString.parse(history.location.search.substring(1)) //to get Query and remove ? at position 0
  const [searchQuery, setSearchQuery] = useState(searchInput || _.get(qs, 'query', ''));
  const [searchIn, setSearchIn] = useState(_.get(qs, 'in', 'all'));
  const [selectedTab, setSelectedTab] = useState(_.get(qs, 'tab', 'types'));
  const schemaId = _.get(match, 'params.id', '')

  const handleTabChange = (e, { name }) => {
    setSelectedTab(name)
    history.push(`/schema/${schemaId}/search?query=${searchQuery}&in=${searchIn}&tab=${name}`)
  }
  const handleSearchChange = (e, { value }) => {
    if (value.length < 1) return setSearchQuery('')
    if (value.length < 5) return;
    setSearchQuery(value)
    history.push(`/schema/${schemaId}/search?query=${value}&in=${searchIn}&tab=${selectedTab}`)
  }

  return (
    <div>
      <Menu attached='top' tabular size='small'>
        <Menu.Item name='types' active={selectedTab === 'types'} onClick={handleTabChange} />
        <Menu.Item name='input_types' active={selectedTab === 'input_types'} onClick={handleTabChange} />
        <Menu.Item name='enums' active={selectedTab === 'enums'} onClick={handleTabChange} />
        <Menu.Item name='fields' active={selectedTab === 'fields'} onClick={handleTabChange} />
        <Menu.Item name='scalars' active={selectedTab === 'scalars'} onClick={handleTabChange} />
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input size='mini' transparent
              defaultValue={searchQuery}
              icon='search'
              iconPosition='left'
              placeholder='Search...'
              onChange={_.debounce(handleSearchChange, 500)}
              action={<Dropdown basic floating options={options}
                value={searchIn}
                onChange={(e, { value }) => {
                  setSearchIn(value)
                  history.push(`/schema/${schemaId}/search?query=${searchQuery}&in=${value}&tab=${selectedTab}`)
                }} />}
            />
          </Menu.Item>
        </Menu.Menu>
      </Menu>

      {!searchQuery && <Segment attached='bottom' placeholder>
        <Header icon>
          <Icon name='search' />
          Search for some Items to show here.
    </Header>
      </Segment>}
      {searchQuery && <Query query={SEARCH_SCHEMA_FOR_TYPES_FIELDS_BY_NAME}
        variables={{
          "typesWhere": {
            "name_cp": searchQuery,
            "rootSchema": schemaId
          },
          "fieldsWhere": {
            "name_cp": searchQuery,
            "rootSchema": schemaId
          }
        }}>
        {({ loading, error, data }) => {
          console.log(JSON.stringify(match, null, 2))
          if (loading) return <Segment loading></Segment>;
          if (error) return <p>Error Loading Schema List</p>;
          return (
            <div>
              {(selectedTab === 'types') && <Segment attached='bottom'>
                <Card.Group>
                  {data.types.filter((type) => type.kind === 'OBJECT').map(type => (
                    <Card key={type.guid}>
                      <Card.Content>
                        <Card.Header>{type.name}</Card.Header>
                        <Card.Meta>{type.abapName}</Card.Meta>
                        <Card.Description>
                          {type.description}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </Segment>}
              {(selectedTab === 'input_types') && <Segment attached='bottom'>
                <Card.Group>
                  {data.types.filter((type) => type.kind === 'INPUT_OBJECT').map(type => (
                    <Card key={type.guid}>
                      <Card.Content>
                        <Card.Header>{type.name}</Card.Header>
                        <Card.Meta>{type.abapName}</Card.Meta>
                        <Card.Description>
                          {type.description}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </Segment>}
              {(selectedTab === 'enums') && <Segment attached='bottom'>
                <Card.Group>
                  {data.types.filter((type) => type.kind === 'ENUM').map(type => (
                    <Card key={type.guid}>
                      <Card.Content>
                        <Card.Header>{type.name}</Card.Header>
                        <Card.Meta>{type.abapName}</Card.Meta>
                        <Card.Description>
                          {type.description}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </Segment>}
              {selectedTab === 'fields' && <Segment attached='bottom'>
                <Card.Group>
                  {data.fields.map(field => (
                    <Card key={field.guid}>
                      <Card.Content>
                        <Card.Header>{field.name} ({_.get(field, 'parentType.name',
                          _.get(field, 'parentField.parentType.name', '') + '.' +
                          _.get(field, 'parentField.name', ''))})</Card.Header>
                        <Card.Meta>{field.abapName} - {field.type ? field.type : field.customType}</Card.Meta>
                        <Card.Description>
                          {field.description}
                        </Card.Description>
                      </Card.Content>
                    </Card>
                  ))}
                </Card.Group>
              </Segment>}
            </div>
          );
        }}
      </Query>}
    </div>

  )
}

export default SchemaSearch