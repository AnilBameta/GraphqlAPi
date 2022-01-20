const express = require('express');
const app = express();
const mongoose = require('mongoose')
const { graphqlHTTP } = require('express-graphql');
const {buildSchema} = require('graphql')
const USERN = require('./models/user')


mongoose.connect('mongodb+srv://AnilB:AnilgotAtlas@cluster0.z3bxe.mongodb.net/datasvalue?retryWrites=true&w=majority')
.then(res => console.log("Connection success"))
.catch(err => console.log(err))


let schema = buildSchema(`
     type Query {
        users : [user!]
     }

      type Mutation {
         AddUser(username:String!,password:String!,mobile:Int,email:String):user!
      }


     type user {
      username:String!,password:String!,mobile:Int,email:String
     }
`) 

// let getUser = function(parent,args,context,info) {
//    const USER = new USERN({
//       UserName: args.username,
//       Password: args.password,
//       MobileNumber: args.mobile,
//       Email: args.email
//   }
//   )
//   USER.save()
//   return USER

// }

let root = {
   Query : {
    users: ()=> user
   },
   Mutation: {
   AddUser(parent,args,context,info){
      USERN.find({UserName:args.username})
      .exec()
      .then(
         res => {
            if(res.length<1)
            {
               const USER = new USERN({
                  UserName: args.username,
                  Password: args.password,
                  MobileNumber: args.mobile,
                  Email: args.email
              }
              )
              USER.save()
              return USER
            }
            
         }
      )
   }
   }
};

 app.use('/graphql', graphqlHTTP({
   schema: schema,
   rootValue:root,
   graphiql: true,
 }));

 app.use((err,req,res,next) => {
    res.status(400).send({error: err.message});
    res.status(401).send({error: err.message});
    res.status(500).send({error: err.message});
 });
 app.listen(8080, () => {
    console.log('Ready to go');
 });
 