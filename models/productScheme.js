const { Schema, model } = require("mongoose");
const Joi = require("joi");

const productSchema = new Schema({
    product_name: {
        type: String,
        required: true
    },
    product_image: {
        type: String,
        required: true
    },
    discount: {
        type: Number,
        required: true,
        min: 0
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    discount_price: {
        type: Number,
        required: true,
        min: 0
    },
    isNew: {
        type: Boolean,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    view_count: {
        type: Number,
        required: true,
        min: 0
    },
    colors: [
        {
            color: { type: String, required: true },
            selected: { type: Boolean, required: true }
        }
    ],
    type: {
        type: String,
        enum: ["today", "our-product", "month", "for-you"],
        required: true
    }
});

const Products = model("Product", productSchema);

const validationProduct = (product) => {
    const schema = Joi.object({
        product_name: Joi.string().required(),
        product_image: Joi.string().uri().required(),
        discount: Joi.number().min(0).required(),
        price: Joi.number().min(0).required(),
        discount_price: Joi.number().min(0).required(),
        isNew: Joi.boolean().required(),
        rating: Joi.number().min(0).max(5).required(),
        view_count: Joi.number().min(0).required(),
        colors: Joi.array()
            .items(
                Joi.object({
                    color: Joi.string().required(),
                    selected: Joi.boolean().required()
                })
            )
            .optional(),
        type: Joi.string()
            .valid("today", "our-product", "month", "for-you")
            .required()
    });
    return schema.validate(product);
};

module.exports = { Products, validationProduct };
