const jwt = require('jsonwebtoken');
const Order = require('../models/orders')

const generateAccessToken = (id, name, isPremium) => {
    return jwt.sign({ userID: id, name: name, isPremium: isPremium }, process.env.JSW_TOKEN_SECRETKEY);
};

exports.updateTrans = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const userDetails = jwt.verify(token, process.env.JSW_TOKEN_SECRETKEY);
        const newToken = generateAccessToken(userDetails.userID, userDetails.name, true);

        const order_id = req.body.order_id;
        const order = await Order.findOne({ where: { orderId: order_id } });

        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        order.paymentId = req.body.payment_id;
        order.status = 'SUCCESS';
        order.userId = userDetails.userId;
        await order.save();

        await req.user.update({ isPremium: true });

     

        res.status(201).json({ token: newToken, order });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error", error: err });
    }
};

