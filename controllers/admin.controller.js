const asyncHandler = require("express-async-handler")
const Product = require("../models/Product")
const { upload } = require("../utils/upload")
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

exports.getAllProducts = asyncHandler(async (req, res) => {
    const result = await Product.find()
    res.json({ message: "Product Fetch Success", result })
})
exports.addProducts = asyncHandler(async (req, res) => {
    upload(req, res, async (err) => {
        console.log(req.file);
        if (err) {
            console.log(err)
            return res.status(400).json({ message: "upload err" })
        }
        const { secure_url } = await cloudinary.uploader.upload(req.file.path)
        // console.log(req.file.path)
        const result = await Product.create({ ...req.body, images: secure_url })
        res.json({ message: "Product Add Success", result })
    })
})
exports.updateProducts = asyncHandler(async (req, res) => {
    res.json({ message: "Product Uodate Success" })
})
exports.deleteProducts = asyncHandler(async (req, res) => {
    const result = await Product.findById(req.params.id)

    const str = result.images.split("/")
    const img = str[str.length - 1].split(".")[0]
    await cloudinary.uploader.destroy(img)
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: "Product Delete Success" })
})
exports.deactivateProducts = asyncHandler(async (req, res) => {
    res.json({ message: "Product Deactivate Success" })
})
exports.activateProducts = asyncHandler(async (req, res) => {
    res.json({ message: "Product Activate Success" })
})
exports.getProductDetails = asyncHandler(async (req, res) => {
    res.json({ message: "Product Detail Fetch Success" })
})

// order
exports.getAllOrders = asyncHandler(async (req, res) => {
    res.json({ message: "Order Fetch Success" })
})
exports.getOrderDetail = asyncHandler(async (req, res) => {
    res.json({ message: "Order Detail Fetch Success" })
})
exports.cancelOrder = asyncHandler(async (req, res) => {
    res.json({ message: "Order Cancel Success" })
})
exports.updateOrderStatus = asyncHandler(async (req, res) => {
    res.json({ message: "Order Status Success" })
})

// user
exports.getAllUsers = asyncHandler(async (req, res) => {
    res.json({ message: "User Fetch Success" })
})
exports.getUserDetail = asyncHandler(async (req, res) => {
    res.json({ message: "User Detail Fetch Success" })
})
exports.blockUser = asyncHandler(async (req, res) => {
    res.json({ message: "User Block Success" })
})
exports.unblockUser = asyncHandler(async (req, res) => {
    res.json({ message: "User Un-block Success" })
})
exports.getUserOrders = asyncHandler(async (req, res) => {
    res.json({ message: "User Order Fetch Success" })
})