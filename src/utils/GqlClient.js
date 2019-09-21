import ApolloClient from "apollo-boost"
import config from './config'

const prepareApolloClient = ({
  baseUrl = config.baseUrl, apiPath, sapClient = config.sapClient }) => {
  console.log('preparing schema for ', apiPath);
  const client = new ApolloClient({
    uri: `${baseUrl}${apiPath}?sap-client=${sapClient}`
  })
  return client;
}

const client = prepareApolloClient({
  apiPath: `${config.gqlPath}${config.gqlAdminPath}`
})
// new ApolloClient({
//   uri: `${config.baseUrl}${config.gqlPath}${config.gqlAdminPath}?sap-client=${config.sapClient}`
// })

export { client as default, prepareApolloClient }
