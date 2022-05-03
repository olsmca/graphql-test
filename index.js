'use strict'

const { buildSchema } = require('graphql') //
const express = require('express') // express server
const { graphqlHTTP } = require('express-graphql') // graphql server
const { readFileSync } = require('fs') // lib read file sync
const { join } = require('path') // lib dir file
const resolvers = require('./lib/resolvers')// configure resolvers

const app = express()
const port = process.env.port || 3333

// definde schema
const schema = buildSchema(
  readFileSync(
    join(__dirname, 'lib', 'schema.graphql')
    , 'utf-8')
)

// enable api graphql in express server with graphiql that resolvers response
app.use('/api', graphqlHTTP({
  schema,
  rootValue: resolvers,
  graphiql: true
}))

// enable url console graphql
app.listen(port, () => {
  console.log(`server is listening at http://localhost:${port}/api`)
})
