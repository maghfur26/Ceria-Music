const PaymentModel = require("../models/Payment");

const paymentController = {
    async updatePaymentStatus(req, res) {
        try {
            const { id } = req.params;
            const { payment_status } = req.body;

            const payment = await PaymentModel.findById(id);
            if (!payment) return res.status(404).json({ message: 'Payment not found' });

            payment.payment_status = payment_status;
            if (payment_status === 'Paid') payment.payment_date = new Date();
            await payment.save();

            return res.status(200).json({
                message: 'Payment status updated successfully',
                payment
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

module.exports = paymentController
