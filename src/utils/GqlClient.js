import ApolloClient from "apollo-boost"
import config from './config'

const client = new ApolloClient({
  uri: `${config.baseUrl}${config.gqlPath}${config.gqlAdminPath}?sap-client=${config.sapClient}`
})

export default client
