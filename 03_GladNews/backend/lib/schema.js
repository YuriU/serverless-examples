const schema = new G.GraphQLSchema({
    query: new G.GraphQLObjectType({
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
  })