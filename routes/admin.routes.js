const router = require("express").Router()
const adminController = require("./../controllers/admin.controller")
  
   router
     .get("/products", adminController.getAllProducts)
     .post("/add-product", adminController.addProducts)
     .put("/update-products/:id", adminController.updateProducts)
     .delete("/delete-product/:id", adminController.deleteProducts)
     .put("/deactivate-products/:id", adminController.deactivateProducts)
     .put("/activate-products/:id", adminController.activateProducts)
     .get("/product-details/:id", adminController.getProductDetails)
   
     .get("/orders", adminController.getAllOrders)
     .get("/order-details/:id", adminController.getOrderDetail)
     .put("/cancel-order/:id", adminController.cancelOrder)
     .put("/cancel-order-status/:id", adminController.updateOrderStatus)

     .get("/users", adminController.getAllUsers)
     .get("/user-details/:id", adminController.getUserDetail)
     .put("/block-user/:id", adminController.blockUser)
     .put ("/unblock-user/:id", adminController.unblockUser)
     .get("/user-orders/:id", adminController.getUserOrders)
module.exports = router