const express = require("express");
const router = express.Router();
const {
    getProducts,
    singleProduct,
    searchProduct,
    postProduct,
    putProduct,
    deleteProduct
} = require("../controllers/product");
const {
    getUsers,
    signInUser,
    signUpUser,
    currentUser
} = require("../controllers/user");
const { loginAdmin } = require("../controllers/admin");

// Products
router.get("/get/product", getProducts);
router.get("/get/product/:id", singleProduct);
router.get("/search/product", searchProduct);
router.post("/post/product", postProduct);
router.put("/put/product/:id", putProduct);
router.delete("/delete/product/:id", deleteProduct);

// Users
router.get("/get/user", getUsers);
router.get("/user/profile", currentUser);
router.post("/sign-in", signInUser);
router.post("/sign-up", signUpUser);

// admin
router.post("/admin", loginAdmin);

module.exports = router;
