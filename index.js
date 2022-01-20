const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const mongoose = require('mongoose');
const typeDefs = require('./typedefs');
const resolvers = require('./resolvers');

async function startServer() {
   const app =express()
   const apolloServer = new ApolloServer({
      typeDefs,
      resolvers,
   })

   await apolloServer.start()

   apolloServer.applyMiddleware({app:app});
   
   app.use((req,res)=> {
      res.send("Hello from express apollo server")
   })
   
   await mongoose.connect('mongodb+srv://AnilB:AnilgotAtlas@cluster0.z3bxe.mongodb.net/datasvalue?retryWrites=true&w=majority')
   .then(res => console.log("Connection success"))
   .catch(err => console.log(err))

   app.listen(8080, ()=> console.log("Server running"))
}


startServer();

 
 