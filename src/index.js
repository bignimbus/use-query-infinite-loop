import { gql, useQuery, ApolloClient, InMemoryCache, ApolloProvider, } from '@apollo/client'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const TEST = gql`
  query {
    foobar {
      id
      lastOnlineAt
    }
  }
`

function Test() {
  const { loading } = useQuery(TEST, { fetchPolicy: 'cache-and-network' })

  return <div>loading = {loading ? 'true' : 'false'}</div>
}

function App() {
  const [count, setCount] = useState(1)

  return (
    <div>
      {Array.from({ length: count }).map((_, i) => <Test key={i} />)}

      <button onClick={() => setCount(count + 1)}>Add</button>
    </div>
  )
}

const client = new ApolloClient({
  uri: 'https://o5xgyw.sse.codesandbox.io',
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
