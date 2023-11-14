// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//     items: [
//         {
//             medicineId: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: 'Medicine',
//                 required: true,
//             },
//             quantity: {
//                 type: Number,
//                 required: true,
//             },
//             price: {
//                 type: Number,
//                 required: true,
//             },
//         },
//     ],
//     totalQty: {
//         type: Number,
//         required: true,
//     },
//     totalCost: {
//         type: Number,
//         required: true,
//     },
//     status: {
//         type: String,
//         enum: ['pending', 'processing', 'shipped', 'delivered'],
//         default: 'pending',
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// const Order = mongoose.model('Order', orderSchema);

// module.exports = Order;