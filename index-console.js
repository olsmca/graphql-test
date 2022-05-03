'use strict'

const { graphql, buildSchema } = require('graphql')
const express = require('express')
const { graphqlHTTP } = require('express-graphql')

const app = express()
const port = process.env.port || 3333

// definde schema
const schema = buildSchema(`
    type Query {
        hello: String
    }
`)

// configure resolvers
const resolvers = {
  hello: () => { return 'Hello World' }
}

// enable api graphql in express server with graphiql that resolvers response
app.use('/api', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}))

// enable
app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}/api`)
})

// execute hello query
graphql({
  schema,
  source: '{ hello }',
  rootValue: resolvers
})
  .then((data) => {
    console.log(data)
  })
  .catch(e => {
    console.log(e)
  })
