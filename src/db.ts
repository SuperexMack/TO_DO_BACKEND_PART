// so from here we are going to set our database 

import mongoose from "mongoose";
import { Schema } from "zod";
const schema = mongoose.Schema
const db_link = "mongodb://localhost:27017/XXX"

// promise

main()
.then(()=>{
    console.log("your database is connected to the mongoose");
})
.catch((err)=>{
    console.log(err)
})

async function main(){
    await mongoose.connect(db_link);
}

// now from the below line there is a schema which need to me followed

const Mydata = new schema({
    title:String,
    description : String,
    time: {
        type: Date,
        default: Date.now // Use a function to get the current date when a new document is created
      },
    userid:{    
        type: schema.Types.ObjectId,
        ref: 'MyUser',
        required:true
      }

})

const MyUser = new schema({
    username:String,
    password:String,
})


export const NewTodo = mongoose.model("NewTodo", Mydata);
export const NewUser = mongoose.model("NewUser", MyUser);


