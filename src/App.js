import React from 'react';

import { ApolloProvider } from 'react-apollo'
import './App.sass';

import AppRouter from "./routers/AppRouter";
import gqlClient from './utils/GqlClient'

function App() {
  return (
    <ApolloProvider client={gqlClient}>
      <AppRouter />
    </ApolloProvider>
  );
}

export default App;
