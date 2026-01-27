import mongoose, { model, Schema } from "mongoose";

const sessionSchema= new Schema({
       id:{
        type:String,
        required:true,
        trim:true,
       },
})

const Session= model("session",sessionSchema);
export default Session;