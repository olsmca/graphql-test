'use strict'

require('dotenv').config({path: 'docker/.env'})
const { makeExecutableSchema } = require('@graphql-tools/schema') //
const express = require('express') // express server
const { graphqlHTTP } = require('express-graphql') // graphql server
const { readFileSync } = require('fs') // lib read file sync
const { join } = require('path') // lib dir file
const resolvers = require('./lib/resolvers')// configure resolvers

const app = express()
const port = process.env.port || 3333

// definde schema
const typeDefs = readFileSync(
  join(__dirname, 'lib', 'schema.graphql')
  , 'utf-8')
const schema = makeExecutableSchema({ typeDefs, resolvers })

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
