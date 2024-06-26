const asyncHandler = require("express-async-handler")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("../models/Admin")
const User = require("../models/User")

exports.registerAdmin = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const found = await Admin.findOne({ email })
    if (found) {
        return res.status(401).json({ message: " Eamil Already registered With Us" })
    }
    const hash = await bcrypt.hash(password, 10)
    await Admin.create({ ...req.body, password: hash })
    res.json({ message: "Admin Register Success" })
})

exports.loginAdmin = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const found = await Admin.findOne({ email })
    if (!found) {
        return res.status(401).json({ message: " Eamil Already registered With Us" })
    }
    const verify = await bcrypt.compare(password, found.password)

    if (!verify) {
        return res.status(401).json({ message: " Password Do Not Match" })
    }
    const token = jwt.sign({ user: found._id }, process.env.JWT_KEY)
    res.cookie("admin", token, { httpOnly: true })

    res.json({
        message: " Admin Login Success", result: {
            _id: found._id,
            name: found.name,
            email: found.email,
        }
    })

})
exports.loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    const found = await User.findOne({ email })
    if (!found) {
        return res.status(401).json({ message: " Eamil Already registered With Us" })
    }
    const verify = await bcrypt.compare(password, found.password)

    if (!verify) {
        return res.status(401).json({ message: " Password Do Not Match" })
    }
    const token = jwt.sign({ user: found._id }, process.env.JWT_KEY)
    res.cookie("auth", token, { httpOnly: true })

    res.json({
        message: " User Login Success", result: {
            _id: found._id,
            name: found.name,
            email: found.email,
        }
    })

})


exports.registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body
    const found = await User.findOne({ email })
    if (found) {
        return res.status(401).json({ message: " Email Already registered With Us" })
    }
    const hash = await bcrypt.hash(password, 10)
    await User.create({ name, email, password: hash })
})

exports.logoutAdmin = asyncHandler(async (req, res) => {
    res.clearCookie("admin")
    res.json({ message: "Admin Logout Success" })
})
