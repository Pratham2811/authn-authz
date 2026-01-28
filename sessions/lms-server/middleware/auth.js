import Cart from "../models/Cart.js";
import Session from "../models/Session.js";

export const authenticate = (req, res, next) => {
const {sessionId}=req.cookies;
  
  if (!sessionId) {
    const sessionId = crypto.randomUUID();
    
    const createSession=Cart.create({guestId:sessionId});
    res.cookie("sessionId",sessionId,{
      sameSite:"none",
      secure:true,
      httpOnly:"true",
    });
    next()

  } else {
   
    
    req.sessionId = sessionId;
    next();
  }
};
