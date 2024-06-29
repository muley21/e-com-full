// userGetAllOrders
// userGetOrderDetails
// userUpdatePassword
// userPlaceOrder
// userCancelOrder

// entry on index

const asyncHandler = require("express-async-handler")
const Order = require("../models/Order")

exports.userGetAllOrders = asyncHandler(async (req, res) => {
    const result = await Order.find({ user: req.params.id }).populate("products.product")
    res.json({ message: " User Fetch Success", result })
})

exports.userGetOrderDetails = asyncHandler(async (req, res) => {
    const result = await Order.findById(req.params.id)
    res.json({ message: "User Details Fetch Success", result })
})

exports.userUpdatePassword = asyncHandler(async (req, res) => {
    const result = await Order.findbyIdAndUpdate(req.params.id)
    res.json({ message: "User Password Update Success", result })
})

exports.userPlaceOrder = asyncHandler(async (req, res) => {
    await Order.create(req.body)
    res.json({ message: "Order Place Succee" })
})

exports.userCancelOrder = asyncHandler(async (req, res) => {
    await Order.findByIdAndUpdate(req.params.id, { status: "cancel" })
    res.json({ message: "Order Cancel Succes" })
})