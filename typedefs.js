const {gql} = require('apollo-server-express');

const typeDefs = gql`
type Query {
   users : [user!]
}

 type Mutation {
    AddUser(username:String!,password:String!,mobile:Int,email:String):user!
 }


type user {
 id:ID,
 UserName:String,
 Password:String,
 MobileNumber:Int,
 Email:String
} 
`
module.exports = typeDefs;