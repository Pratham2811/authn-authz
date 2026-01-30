import express from "express";
import Session from "../models/Session.js";
import mongoose from "mongoose";
import Cart from "../models/Cart.js";
const router = express.Router();

// GET cart
router.get("/", async (req, res) => {
  const sessionId = req.signedCookies.sid;
  if (!sessionId) {
    return res.status(400).json({
      message: "session id is invalid",
    });
  }
  // console.log(sessionId);
  const cartData = await Cart.findOne({ ownerId: sessionId }).populate(
    "courses.courseId",
  );

  res.json(cartData);
});

// Add to cart
router.post("/", async (req, res) => {
  let sessionId = req.signedCookies.sid;
  
  
  if (!sessionId) {
    console.log(sessionId);
    const newSessionId = crypto.randomUUID();
    const guestCart = await Cart.create({
      ownerType:"guest",
      ownerId: newSessionId,
    });
    const session=await Session.create({
      sid:newSessionId,

    })
    sessionId = newSessionId;
   
    res.cookie("sid", newSessionId, {
      httpOnly: true,
      signed: true,
      maxAge: 1000 * 60 * 60 * 60,
    });
    
  }
  const courseId = new mongoose.Types.ObjectId(req.body.courseId);

  const result = await Cart.updateOne(
    { ownerId: sessionId, "courses.courseId": courseId },
    {
      $inc: {
        "courses.$.quantity": 1,
      },
    },
  );
console.log(result);

  if (result.matchedCount === 0) {
    const cartItem = await Cart.updateOne(
      { ownerId: sessionId },
      {
        $push: {
          "courses": {
            courseId: courseId,
            quantity: 1,
          },
        },
      },
    );
  }
  res.json({ messgae: "Item Added to cart sucessfully" });
});

// Remove course from cart
router.delete("/:courseId", async (req, res) => {
  const { courseId } = req.params;
  const sessionId = req.signedCookies.sid;
  const session = await Cart.updateOne(
    { ownerId: sessionId },
    { $pull: { "courses": { courseId } } },
  );

  res.json({ message: "item deleted succesfully" });
});

export default router;
