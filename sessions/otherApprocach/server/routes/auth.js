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
  let guestCart = null;

  if (req.signedCookies.sid) {
    guestSession = await Session.findOne({ sid: req.signedCookies.sid });

    guestCart = await Cart.findOne({
      ownerType: "guest",
      ownerId: req.signedCookies.sid,
    });
  }

  // 🔑 USER CART
  let userCart = await Cart.findOne({
    ownerType: "user",
    ownerId: user._id,
  });

  if (!userCart) {
    userCart = await Cart.create({
      ownerType: "user",
      ownerId: user._id,
      courses: [],
    });
  }

  // 🔥 MERGE GUEST CART → USER CART
  if (guestCart) {
    for (const guestItem of guestCart.courses) {
      const existingItem = userCart.courses.find((item) =>
        item.courseId.equals(guestItem.courseId),
      );

      if (existingItem) {
        existingItem.quantity += guestItem.quantity;
      } else {
        userCart.courses.push({
          courseId: guestItem.courseId,
          quantity: guestItem.quantity,
        });
      }
    }

    await userCart.save();

    // cleanup guest cart AFTER merge
    await Cart.deleteOne({
      ownerType: "guest",
      ownerId: req.signedCookies.sid,
    });
  }

  // cleanup guest session AFTER everything succeeded
  if (guestSession) {
    await Session.deleteOne({ sid: guestSession.sid });
  }

  // 🔐 CREATE NEW AUTH SESSION
  const newSession = await Session.create({
    sid: crypto.randomUUID(),
    userId: user._id,
    expiresAt: new Date(Date.now()/1000+60*60*60),
  });

  res.cookie("sid", user._id, {
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

router.post("/logout", async (req, res) => {
  const sessionId = req.signedCookies.sid;
  if (!sessionId) {
    return res.status(400).json({
      status: "error",
      messgae: "Invalid session",
    });
  }
  const session = await Session.deleteOne({ userId: sessionId });
  
  res.clearCookie("sid").status(200).json({
    message:"user Logged Out sucessFully",

  })
});

router.get("/me",async (req,res)=>{
  const sessionId=req.signedCookies.sid;
  if(!sessionId){
    return res.status(404).json({
      message:"user not found",
    })
  }
 
  
  const session=await Session.findOne({userId:sessionId});
  
  
  const user=await User.findById({_id:sessionId})
  const currentTime=Math.round(Date.now()/1000);
  console.log(currentTime-session.expiresAt);
  
  if(session.expiresAt<currentTime){
    return res.clearCookie("sid").status(401).json({
      status:"Error",
      message:"Session Expired",
    })
  }

  return res.status(200).json({
    user
  })

})
export default router;
