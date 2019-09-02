import Client from "apollo-boost";

export const client = new Client({
  uri: "https://votr-graphql.herokuapp.com/graphql"
});
