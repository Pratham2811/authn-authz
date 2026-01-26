import mongoose, { model, Schema } from "mongoose";

const sessionSchema= new Schema({
       id:{
        type:String,
        required:true,
        trim:true,
       },
       course:[
      {
          courseId:{
             type:Schema.Types.ObjectId,
             required:true,
             trim:true,
        },
        courseCount:{
            type:Number,
            
        }
      }
       ]
})

const Session= model("session",sessionSchema);
export default Session;