import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// GET cart
router.get("/", async (req, res) => {
  const { sessionId } = req.cookies;
  const cartItem = await Cart.findOne({ guestId: sessionId }).populate(
    "courses.courseId",
  );
  return res.json(cartItem);
});

// Add to cart
router.post("/", async (req, res) => {
  const sessionId = req.sessionId;

  const courseId = req.body.data._id;

  const cartItem = await Cart.findOne({
    guestId: sessionId,
    "courses.courseId": courseId,
  });

  if (cartItem) {
    const cartData = await Cart.findOneAndUpdate(
      { guestId: sessionId, "courses.courseId": courseId },
      {
        $inc: {
          "courses.$.quantity": 1,
        },
      },
      
    );
    console.log(cartData);
      
    return res.json(cartData);
  } else {
    const cartData = await Cart.findOneAndUpdate(
      { guestId: sessionId },
      {
        $push: {
          courses: {
            courseId: courseId,
            quantity: 1,
          },
        },
      },
    );
    console.log(cartData);
      
    return res.json(cartData);
  }
});

// Remove course from cart
router.delete("/:courseId", async (req, res) => {
  //Add your code here
});

// Clear cart
router.delete("/", async (req, res) => {
  //Add your code here
});

export default router;
