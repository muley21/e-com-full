const router = require("express").Router()
const authController = require("./../controllers/auth.controller")

router
    .post("/login-user", authController.loginUser)
    .post("/login-admin", authController.loginAdmin)
    .post("/register-user", authController.registerUser)
    .post("/register-admin", authController.registerAdmin)
    .post("/logout-admin", authController.logoutAdmin)

    module.exports = router    
