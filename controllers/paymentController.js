import { instance } from "../server.js";

export const checkout = async (req, res) => {
  try {
    const { plan } = req.body;

    let amount;

    switch (plan) {
      case "starter":
        amount = 747;
        break;
      case "pro":
        amount = 1497;
        break;
      case "business":
        amount = 2997;
        break;
      default:
        return res
          .status(400)
          .json({ success: false, message: "Invalid Plan" });
    }

    const options = {
      amount: amount * 100,
      currency: "USD",
      receipt: `receipt_${Date.now()}`,
    };

    const order = await instance.orders.create(options);
    console.log(order, "This is order");

    res.status(200).json({ success: true, order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Checkout failed" });
  }
};
