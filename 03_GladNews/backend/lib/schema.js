'use strict'

const G = require('graphql')
const resolvers = require('./resolvers')
const types = require('./types')

const rootQuery = new G.GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
      ping: {
        type: G.GraphQLString,
        // {"ping": "pong"}
        resolve () {
          return 'pong'
        }
      }
    }
  })

module.exports.Schema = new G.GraphQLSchema( {
    query: rootQuery
})