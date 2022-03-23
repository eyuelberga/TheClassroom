const { GraphQLClient } = require("graphql-request");
const fetch = require("node-fetch");

const client = new GraphQLClient(`${process.env.HASURA_HTTPS_URL}/graphql`, {
  headers: {
    "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET
  },
  fetch
});

module.exports = client;