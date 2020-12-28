const { ApolloServer, gql } = require("apollo-server-lambda");
const faundadb = require("faunadb");
const q = faundadb.query;
const dotenv = require("dotenv");
dotenv.config();

const typeDefs = gql`
  type Query {
    bookmarks: [Bookmarks]!
  }
  type Mutation {
    addBookmark(title: String!, link: String!, imgURL: String!): Bookmarks
    deleteBookmark(id: ID!): Bookmarks
  }
  type Bookmarks {
    id: ID!
    title: String!
    link: String!
    imgURL: String!
  }
`;

const resolvers = {
  Query: {
    bookmarks: async (roots, args, context) => {
      try {
        const adminClient = new faundadb.Client({
          secret: process.env.FAUNA_DB_SECRET_KEY,
        });

        const result = await adminClient.query(
          q.Map(
            q.Paginate(q.Match(q.Index("bookmark_index"))),
            q.Lambda("X", q.Get(q.Var("X")))
          )
        );

        console.log(result.data);

        return result.data.map((value) => {
          return {
            id: value.ref.id,
            title: value.data.title,
            link: value.data.link,
            imgURL: value.data.imgURL,
          };
        });
      } catch (error) {
        console.log(error.message);
      }
    },
  },

  Mutation: {
    addBookmark: async (_, { title, link, imgURL }) => {
      try {
        const adminClient = new faundadb.Client({
          secret: process.env.FAUNA_DB_SECRET_KEY,
        });

        const result = await adminClient.query(
          q.Create(q.Collection("bookmark_app"), {
            data: {
              title,
              link,
              imgURL,
            },
          })
        );

        return {
          id: result.ref.id,
          title: result.ref.data.title,
          link: result.ref.data.link,
          imgURL: result.ref.data.imgURL,
        };
      } catch (error) {
        console.log(error.message);
      }
    },
    deleteBookmark: async (_, { id }) => {
      try {
        const adminClient = new faundadb.Client({
          secret: process.env.FAUNA_DB_SECRET_KEY,
        });

        const result = await adminClient.query(
          q.Delete(q.Ref(q.Collection("bookmark_app"), id))
        );
        console.log(result);
        return {
          id: result.ref.id,
          title: result.ref.data.title,
          link: result.ref.data.link,
          imgURL: result.ref.data.imgURL,
        };
      } catch (error) {
        console.log(error.message);
      }
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

exports.handler = server.createHandler();
