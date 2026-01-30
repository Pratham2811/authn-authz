import Session from "../models/Session.js";
export const createSession=async (req,res,next)=>{
   

  
      
      const session = await Session.create({});
      res.cookie("sid", session.id, {
        httpOnly: true,
        signed: true,
        maxAge: 1000 * 60 * 60 * 60,
      });
    
    return;
}