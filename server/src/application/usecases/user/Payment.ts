import { razorpay } from "../../../application/services/RazorpayService";

export class CreatePaymentOrder {
  async execute(amountInRupees: number) {
    const amountInPaise = amountInRupees * 100;

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
      payment_capture: true,
    });

    return order;
  }
}
