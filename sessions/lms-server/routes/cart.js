import express from "express";
import Cart from "../models/Cart.js";

const router = express.Router();

// GET cart
router.get("/", async (req, res) => {
  //Add your code here
});

// Add to cart
router.post("/", async (req, res) => {
  const sessionId = req.sessionId;
  console.log(req.body);
  const courseId=req.body._id;
  const cartItem = await Cart.findOne({
    guestId: sessionId,
    "courses.courseId": courseId,
  });
  console.log(cartItem);
  if (cartItem) {
    await Cart.updateOne(
      { guestId: sessionId, "courses.courseId": courseId },
      {
        $inc: {
          "courses.$.quantity": 1,
        },
      },
    );
  }else{
    await Cart.updateOne({guestId:sessionId},{
      $push:{
        courses:{
          courseId:courseId,
          quantity:1,

        }
      }
    },
    {upsert:true}
  )
  }
  res.json("full filles the add to cart");
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
