const express = require("express");
const router = express.Router();
const PaymentController = require("../Controllers/Payment");

router.get("/", PaymentController.getAllPayments);
router.post("/", PaymentController.addPayments);
router.get("/:id", PaymentController.getById);
router.put("/:id", PaymentController.updatePayment);
router.delete("/:id", PaymentController.deletePayment);



module.exports = router;
