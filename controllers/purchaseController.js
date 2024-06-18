// // const RazorPay = require('razorpay');

// // exports.purchasePremium = async (req, res, next) => {
// //     try {
// //         const rzp = new RazorPay({
// //             key_id: process.env.RAZORPAY_KEY_ID,
// //             key_secret: process.env.RAZORPAY_KEY_SECRET
// //         });
// //         const amount = req.header('price');

// //         rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
// //             if (err) {
// //                 console.error(err);
// //                 return res.status(500).json({ message: "Error in creating order", error: err });
// //             }
// //             console.log(1);

// //             try {
// //                 await req.user.createOrder({ orderId: order.id, paymentId: 'PENDING', status: 'PENDING' });
// //                 console.log(order);
// //                 return res.status(201).json({ order, key_id: rzp.key_id });
// //             } catch (err) {
// //                 console.error(err);
// //                 return res.status(500).json({ message: "Error in creating order record", error: err });
// //             }
// //         });
// //     } catch (err) {
// //         console.error(err);
// //         return res.status(500).json({ message: "Server error", error: err });
// //     }
// // };

// // const jwt = require('jsonwebtoken');

// // const generateAccessToken = (id, name, isPremium) => {
// //     return jwt.sign({ userID: id, name: name, isPremium: isPremium }, 'any secret key string');
// // }

// // exports.updateTransStatus = async (req, res, next) => {
// //     try {
// //         // change auth token -> old token + premium
// //         const token = req.header('Authorization');
// //         const userDetails = jwt.verify(token, 'any secret key string');
// //         newToken = generateAccessToken(userDetails.userID, userDetails.name, true);

// //         // update successfull order
// //         const order_id = req.body.order_id;

// //         const order = await req.user.getOrders({ where: { orderId: order_id } });
// //         order[0].paymentId = req.body.payment_id;
// //         order[0].status = 'SUCCESS';
// //         const updateOrder = await order[0].save();

// //         res.status(201).json({ token: newToken, order: updateOrder });
// //     }
// //     catch (err) {
// //         console.log(err);
// //     }
// // }

// const RazorPay = require('razorpay');
// const jwt = require('jsonwebtoken');
// const secretKey = process.env.JSW_TOKEN_SECRETKEY;

// const generateAccessToken = (id, name, isPremium) => {
//     return jwt.sign({ userID: id, name: name, isPremium: isPremium }, secretKey);
// }
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
//                 await req.user.createOrder({ orderId: order.id, paymentId: 'PENDING', status: 'FAILED' });
//                 console.log(order);
//                 return res.status(201).json({ order, key_id: rzp.key_id });
//             } catch (err) {
//                 console.error(err);
//                 return res.status(500).json({ message: "Error in creating order record", error: err });
//             }
//         });
//     } catch (err) {
//         console.error('Error in purchasePremium:', err);
//         return res.status(500).json({ message: "Server error", error: err });
//     }
// };

// exports.updateTransStatus = async (req, res, next) => {
//     try {
//         const token = req.header('Authorization');
//         const userDetails = jwt.verify(token, secretKey);
//         const newToken = generateAccessToken(userDetails.userID, userDetails.name, true);

//         const order_id = req.body.order_id;
//         const order = await req.user.getOrders({ where: { orderId: order_id } });

//         if (!order || order.length === 0) {
//             return res.status(404).json({ message: "Order not found" });
//         }

//         order[0].paymentId = req.body.payment_id;
//         order[0].status = 'SUCCESS';
//         const updateOrder = await order[0].save();

//         res.status(201).json({ token: newToken, order: updateOrder });
//     } catch (err) {
//         console.error('Error in updateTransStatus:', err);
//         return res.status(500).json({ message: "Server error", error: err });
//     }
// }

const RazorPay = require('razorpay');
const jwt = require('jsonwebtoken');
const secretKey = process.env.JSW_TOKEN_SECRETKEY; 

const generateAccessToken = (id, name, isPremium) => {
    return jwt.sign({ userID: id, name: name, isPremium: isPremium }, secretKey);
}

exports.purchasePremium = async (req, res, next) => {
    try {
        const rzp = new RazorPay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
        });
        const amount = req.header('price');

        rzp.orders.create({ amount, currency: "INR" }, async (err, order) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ message: "Error in creating order", error: err });
            }

            try {
                await req.user.createOrder({ orderId: order.id, paymentId: 'PENDING', status: 'PENDING' });
                console.log(order);
                return res.status(201).json({ order, key_id: rzp.key_id });
            } catch (err) {
                console.error(err);
                return res.status(500).json({ message: "Error in creating order record", error: err });
            }
        });
    } catch (err) {
        console.error('Error in purchasePremium:', err);
        return res.status(500).json({ message: "Server error", error: err });
    }
};

exports.updateTransStatus = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const userDetails = jwt.verify(token, secretKey);
        const newToken = generateAccessToken(userDetails.userID, userDetails.name, true);

        const order_id = req.body.order_id;
        const order = await req.user.getOrders({ where: { orderId: order_id } });

        if (!order || order.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        order[0].paymentId = req.body.payment_id;
        order[0].status = 'SUCCESS';
        const updateOrder = await order[0].save();

        res.status(201).json({ token: newToken, order: updateOrder });
    } catch (err) {
        console.error('Error in updateTransStatus:', err);
        return res.status(500).json({ message: "Server error", error: err });
    }
}
