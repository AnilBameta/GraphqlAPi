const {
   GraphQLObjectType,
   GraphQLString,
   GraphQLList,
   GraphQLSchema,
   GraphQLNonNull,
   GraphQLInt
} =require('graphql');


const users = [
    {id:1,username:"Anil",password:"1234",mobile:36273273,email:"xyz@gmail.com"},
    {id:2,username:"Bameta",password:"4321",mobile:36273273,email:"xyz@gmail.com"},
    {id:3,username:"Akku",password:"1111",mobile:36273273,email:"xyz@gmail.com"}
]




const User = new GraphQLObjectType({
    name:'User',
    fields: ()=> ({
        id:{type:GraphQLInt},
        username:{type:GraphQLString},
        password:{type:GraphQLString},
        mobile:{type:GraphQLInt},
        email:{type:GraphQLString}
    })
})

const RootQuery = new GraphQLObjectType({
    name:'RootQueryType',
    fields:{
    user: {
        type:User,
        args:{
            id:{type:GraphQLInt}
        },resolve(parentValue,args){
            for(let i=0;i<users.length;i++){
                if(users[i].id== args.id){
                    return users[i]
                }
            }
        }
    }
}
})

module.exports = new GraphQLSchema({
     query:RootQuery
})