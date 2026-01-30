import mongoose, { Schema } from "mongoose";
import Course from "./Course.js";

const sessionSchema = new mongoose.Schema({
 
  sid:{
       type:String,
       required:true,
       trim:true,
  },
  userId:{
    type:Schema.Types.ObjectId,
    default:null,
  },
  expiresAt: {
    type: Number,
   default:Math.round(Date.now()/1000*60*60*60)
  },
});


const Session = mongoose.model("Session", sessionSchema);

export default Session;
