import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import mongoose from "mongoose";
import Session from "../models/Session.js";
import Cart from "../models/Cart.js";
const router = express.Router();

// Register new user
router.post("/register", async (req, res) => {
  try {
    const { email, password, name } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const userId = new mongoose.Types.ObjectId();
    const user = new User({
      _id: userId,
      email,
      password,
      name,
    });

    const createduser = await user.save();
    res.status(201).json({
      message: "User registered successfully",

      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  let guestSession = null;
  let guestcart=null;
  if (req.signedCookies.sid) {
    guestSession = await Session.findOne({ sid: req.signedCookies.sid });
    await Session.deleteOne({ sid: req.signedCookies.sid });
    guestcart=await Cart.findOne({ownerId:req.signedCookies.sid});
    await Cart.deleteOne({ownerId:req.signedCookies.sid});

  }

  const newSession = await Session.create({
    sid: crypto.randomUUID(),
    userId: user._id,
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  });
  const cartData=await Cart.findOne({ownerType:"user",ownerId:user._id});
  if(cartData){
   console.log(cartData);
   
   
  }

  res.cookie("sid", newSession.sid, {
    httpOnly: true,
    secure: true,
    signed: true,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.json({
    message: "Login successful",
    user: {
      id: user._id,
      email: user.email,
      name: user.name,
    },
  });
});

router.post("/logout",async ( req,res)=>{
   const sessionId=req.signedCookies.sid;
   if(!sessionId){
  return res.status(400).json({
    status:"error",
    messgae:"Invalid session"
  });   
   }
  const session=await Session.findOne({sid:sessionId});

  console.log(session);
  
})

export default router;
