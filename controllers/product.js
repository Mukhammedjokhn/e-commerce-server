const { Products, validationProduct } = require("../models/productScheme");

const getProducts = async (req, res) => {
    try {
        const { type } = req.query;

        let filter = {};

        if (type && type !== "all") {
            filter.type = type;
        }

        const products = await Products.find(filter);

        if (!products.length) {
            return res.status(404).json({
                variant: "error",
                message: "No products found",
                innerData: null
            });
        }

        res.status(200).json({
            variant: "success",
            message: "all products",
            innerData: products
        });
    } catch (err) {
        res.status(500).json({
            variant: "error",
            message: "server error",
            innerData: null
        });
    }
};

const singleProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const oneProduct = await Products.findById(id);
        if (!oneProduct) {
            return res.status(404).json({
                variant: "error",
                message: "Product not found",
                innerData: null
            });
        }
        res.status(200).json({
            variant: "success",
            message: "single product",
            innerData: oneProduct
        });
    } catch (err) {
        res.status(500).json({
            variant: "error",
            message: "server error or invalid ID",
            innerData: null
        });
    }
};

const searchProduct = async (req, res) => {
    try {
        const { value } = req.query;
        const products = await Products.find();
        const searchData = products.filter((i) =>
            i.product_name.toLowerCase().includes(value.toLowerCase())
        );

        if (!searchData.length) {
            return res.status(404).json({
                variant: "error",
                msg: "product not found",
                innerData: null
            });
        }

        res.status(200).json({
            variant: "success",
            msg: "search product",
            innerData: searchData
        });
    } catch (err) {
        res.status(500).json({
            variant: "error",
            msg: "server error",
            innerData: null
        });
    }
};

const postProduct = async (req, res) => {
    try {
        const { error } = validationProduct(req.body);
        if (error) {
            return res.status(400).json({
                variant: "error",
                message: error.details[0].message,
                innerData: null
            });
        }

        let newProduct = await Products.create(req.body);
        res.status(201).json({
            variant: "success",
            message: "product is created",
            innerData: newProduct
        });
    } catch (err) {
        res.status(500).json({
            variant: "error",
            message: "server error",
            innerData: null
        });
    }
};

const putProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                variant: "error",
                message: "ID is required",
                innerData: null
            });
        }

        const updatedProduct = await Products.findByIdAndUpdate(id, req.body, {
            new: true
        });
        if (!updatedProduct) {
            return res.status(404).json({
                variant: "error",
                message: "Product not found",
                innerData: null
            });
        }

        res.status(200).json({
            variant: "success",
            message: "product updated",
            innerData: updatedProduct
        });
    } catch (err) {
        res.status(500).json({
            variant: "error",
            message: "server error",
            innerData: null
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).json({
                variant: "error",
                message: "ID is required",
                innerData: null
            });
        }

        const deletedProduct = await Products.findByIdAndRemove(id);
        if (!deletedProduct) {
            return res.status(404).json({
                variant: "error",
                message: "Product not found",
                innerData: null
            });
        }

        res.status(200).json({
            variant: "success",
            message: "product deleted",
            innerData: deletedProduct
        });
    } catch (err) {
        res.status(500).json({
            variant: "error",
            message: "server error",
            innerData: null
        });
    }
};

const getProductsByType = async (req, res) => {
    try {
        const { type } = req.query;

        if (!type) {
            return res.status(400).json({
                variant: "error",
                message: "Type is required",
                innerData: null
            });
        }

        const products = await Products.find({ type: type }).sort({ _id: -1 });
        if (!products.length) {
            return res.status(404).json({
                variant: "error",
                message: "No products found for this type",
                innerData: null
            });
        }

        res.status(200).json({
            variant: "success",
            message: `Products of type ${type}`,
            innerData: products
        });
    } catch (err) {
        res.status(500).json({
            variant: "error",
            message: "server error",
            innerData: null
        });
    }
};

module.exports = {
    getProducts,
    singleProduct,
    searchProduct,
    postProduct,
    putProduct,
    deleteProduct,
    getProductsByType
};
