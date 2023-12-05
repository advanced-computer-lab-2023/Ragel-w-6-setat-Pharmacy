// const mongoose = require("mongoose");

// const cartSchema = new mongoose.Schema({
//     items: [
//         {
//             medicineId: {
//                 type: mongoose.Schema.Types.ObjectId,
//                 ref: "Medicine",
//             },
//             quantity: {
//                 type: Number,
//                 default: 1,
//             },
//             price: {
//                 type: Number,
//                 default: 0,
//             },
//             name: {
//                 type: String,
//             },
//         },
//     ],
//     totalQty: {
//         type: Number,
//         default: 0,
//         required: true,
//     },
//     totalCost: {
//         type: Number,
//         default: 0,
//         required: true,
//     },
//     // Reference to the Patient model
//     patient: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Patient",
//         required: true,
//     },
//     createdAt: {
//         type: Date,
//         default: Date.now,
//     },
// });

// module.exports = mongoose.model("Cart", cartSchema);
