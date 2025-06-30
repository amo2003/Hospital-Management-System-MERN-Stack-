const Payment = require("../Model/Payment");

// Get all payments
const getAllPayments = async (req, res, next) => {
  try {
    const payments = await Payment.find();
    if (!payments || payments.length === 0) {
      return res.status(404).json({ message: "Payments not found" });
    }
    return res.status(200).json({ payments });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error retrieving payments" });
  }
};

// Add a payment
const addPayments = async (req, res, next) => {
  const { name, amount, number, date } = req.body;

  try {
    const newPayment = new Payment({ name, amount, number, date });
    await newPayment.save();
    return res.status(201).json({ payment: newPayment });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to add payment" });
  }
};

// Get payment by ID
const getById = async (req, res, next) => {
  const id = req.params.id;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json({ payment });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error fetching payment" });
  }
};

// Update payment
const updatePayment = async (req, res, next) => {
  const id = req.params.id;
  const { name, amount, number, date } = req.body;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const updatedPayment = await Payment.findByIdAndUpdate(
      id,
      { name, amount, number, date },
      { new: true }
    );

    if (!updatedPayment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    return res.status(200).json({ payment: updatedPayment });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to update payment" });
  }
};

// Delete payment
const deletePayment = async (req, res, next) => {
  const id = req.params.id;

  if (!id || id === "undefined") {
    return res.status(400).json({ message: "Invalid or missing ID" });
  }

  try {
    const payment = await Payment.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }
    return res.status(200).json({ message: "Payment deleted", payment });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Unable to delete payment" });
  }
};

// Export controller functions
exports.getAllPayments = getAllPayments;
exports.addPayments = addPayments;
exports.getById = getById;
exports.updatePayment = updatePayment;
exports.deletePayment = deletePayment;
