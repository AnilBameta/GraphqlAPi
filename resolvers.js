const USERN = require('./models/user');


const resolvers = {
    Query : {
       users: async() => await USERN.find()
       
      },
      Mutation: {
      AddUser:(parent,args,context,info)=>
      {
         USERN.find({UserName:args.username})
         .exec()
         .then(
            response => {
               if(response.length<1)
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
           else {
               return null
           }
               
            }
          )
      
      }
 }
}


 module.exports = resolvers;