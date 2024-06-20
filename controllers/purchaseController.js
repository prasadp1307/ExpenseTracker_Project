const Razorpay = require('razorpay');
const jwt = require('jsonwebtoken');
const Order = require('../models/orders'); 
require('dotenv').config();

exports.purchasePremium = async (req, res, next) => {
    try {
        const rzp = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const amount = req.header('price');

        rzp.orders.create({ amount, currency: 'INR' }, async (err, order) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error in creating order", error: err });
            }

            try {
                // Store the userId with the order details in the database
                await Order.create({ userId: req.user.id, orderId: order.id, paymentId: 'PENDING', status: 'PENDING' });
                return res.status(201).json({ order, key_id: rzp.key_id });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ message: "Error in creating order record", error: err });
            }
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error", error: err });
    }
};






// const generateAccessToken = (id, name, isPremium) => {
//     return jwt.sign({ userID: id, name: name, isPremium: isPremium }, process.env.JSW_TOKEN_SECRETKEY);
// };

// exports.purchasePremium = async (req, res, next) => {
//     try {
//         const rzp = new RazorPay({
//             key_id: process.env.RAZORPAY_KEY_ID,
//             key_secret: process.env.RAZORPAY_KEY_SECRET
//         });
//         const amount = req.header('price');

//         rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
//             if (err) {
//                 console.error(err);
//                 return res.status(500).json({ message: "Error in creating order", error: err });
//             }

//             try {
//                 await Order.create({ userId: req.user.id, orderId: order.id, paymentId: 'PENDING', status: 'PENDING' });
//                 return res.status(201).json({ order, key_id: rzp.key_id });
//             } catch (err) {
//                 console.error(err);
//                 return res.status(500).json({ message: "Error in creating order record", error: err });
//             }
//         });
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Server error", error: err });
//     }
// };


// // const generateAccessToken = (id, name, isPremium) => {
// //     return jwt.sign({ userID: id, name: name, isPremium: isPremium }, process.env.JSW_TOKEN_SECRETKEY);
// // };

// // exports.updateTrans = async (req, res, next) => {
// //     try {
// //         const token = req.header('Authorization');
// //         const userDetails = jwt.verify(token, process.env.JSW_TOKEN_SECRETKEY);
// //         const newToken = generateAccessToken(userDetails.userID, userDetails.name, true);

// //         const order_id = req.body.order_id;
// //         const order = await Order.findOne({ where: { orderId: order_id } });

// //         if (!order) {
// //             return res.status(404).json({ message: "Order not found" });
// //         }

// //         order.paymentId = req.body.payment_id;
// //         order.status = 'SUCCESS';
// //         const updateOrder = await order.save();

// //         res.status(201).json({ token: newToken, order: updateOrder });
// //     } catch (err) {
// //         console.log(err);
// //         res.status(500).json({ message: "Server error", error: err });
// //     }
// // };


// // // const Razorpay = require('razorpay');
// // // const jwt = require('jsonwebtoken');
// // // const Order = require('../models/orders'); 
// // // require('dotenv').config();

// // // const generateAccessToken = (id, name, isPremium) => {
// // //     return jwt.sign({ userID: id, name: name, isPremium: isPremium }, process.env.JWT_TOKEN_SECRETKEY);
// // // };

// // // exports.purchasePremium = async (req, res, next) => {
// // //     try {
// // //         const rzp = new Razorpay({
// // //             key_id: process.env.RAZORPAY_KEY_ID,
// // //             key_secret: process.env.RAZORPAY_KEY_SECRET
// // //         });
// // //         const amount = req.header('price');

// // //         rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
// // //             if (err) {
// // //                 console.error(err);
// // //                 return res.status(500).json({ message: "Error in creating order", error: err });
// // //             }

// // //             try {
// // //                 // Store the userId with the order details in the database
// // //                 await Order.create({ userId: req.user.id, orderId: order.id, paymentId: 'PENDING', status: 'PENDING' });
// // //                 return res.status(201).json({ order, key_id: rzp.key_id });
// // //             } catch (err) {
// // //                 console.error(err);
// // //                 return res.status(500).json({ message: "Error in creating order record", error: err });
// // //             }
// // //         });
// // //     } catch (err) {
// // //         console.error(err);
// // //         return res.status(500).json({ message: "Server error", error: err });
// // //     }
// // // };


// // // const generateAccessToken2 = (id, name, isPremium) => {
// // //     return jwt.sign({ userID: id, name: name, isPremium: isPremium }, process.env.JSW_TOKEN_SECRETKEY);
// // // };

// // // exports.updateTrans = async (req, res, next) => {
// // //     try {
// // //         const token = req.header('Authorization');
// // //         const userDetails = jwt.verify(token, process.env.JSW_TOKEN_SECRETKEY);
// // //         const newToken = generateAccessToken2(userDetails.userID, userDetails.name, true);

// // //         const order_id = req.body.order_id;
// // //         const order = await Order.findOne({ where: { orderId: order_id } });

// // //         if (!order) {
// // //             return res.status(404).json({ message: "Order not found" });
// // //         }

// // //         order.paymentId = req.body.payment_id;
// // //         order.status = 'SUCCESS';
// // //         await order.save();

// // //         await req.user.update({ isPremium: true });

// // //         res.status(201).json({ token: newToken, order });
// // //     } catch (err) {
// // //         console.log(err);
// // //         res.status(500).json({ message: "Server error", error: err });
// // //     }
// // // };
