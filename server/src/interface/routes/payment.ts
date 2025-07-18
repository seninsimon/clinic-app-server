import express from "express";
import { CreatePaymentOrder } from "../../application/usecases/user/Payment";

const router = express.Router();
const paymentUsecase = new CreatePaymentOrder();

router.post("/payment/create-order", async (req, res) => {
  try {
    const { amount } = req.body;
    const order = await paymentUsecase.execute(amount);
    res.json(order);
  } catch (err) {
    console.error("Razorpay Error:", err);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});

export {router as paymentRouter}
