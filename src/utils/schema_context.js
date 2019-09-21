import React from 'react'

const SchemaContext = React.createContext({
  schema: {}, client: undefined,
  updateSchema: ({ guid, name, path }) => { }
})

export const SchemaProvider = SchemaContext.Provider
export const SchemaConsumer = SchemaContext.Consumer
export default SchemaContext