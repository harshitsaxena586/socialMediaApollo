import express from "express";
import { ApolloError, ApolloServer, gql } from "apollo-server-express";
import { typeDefs } from "./typeDefs";
import { resolvers } from "./resolvers";
import mongoose from "mongoose";
import cors from "cors";
import { User } from "./models/User";
import users from "./routes/users";
import jwt from "jsonwebtoken";
async function startApolloServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
      const token = req.headers.authorization || "";
      try {
        var decoded = jwt.verify(token, process.env.secretKey);
        const { userName, id } = decoded;
        const user = await User.findById(id);
        return { userName, id, user };
      } catch (error) {
        console.log(error);
      }

      if (!decoded) {
        throw new ApolloError("No Auth Token found ", "401", {
          msg: "hello client",
        });
      }
      return { token };
    },
  });

  await server.start();

  try {
    await mongoose.connect(
      "mongodb+srv://harshit:justfuc8@cluster0.tua2j.mongodb.net/socialmediaDatabase?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
    );
  } catch (error) {
    console.error(error);
  }

  server.applyMiddleware({ app });
  app.use(express.json());
  app.use(cors());

  app.use("/users", users);

  app.use((req, res) => {
    res.status(200);
    res.send("Hello Backend app !");
    res.end();
  });

  await new Promise((resolve) =>
    app.listen({ port: process.env.PORT || 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
  return { server, app };
}
startApolloServer();
