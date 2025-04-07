const { Schema, model } = require("mongoose");
const Joi = require("joi");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const Users = model("user", userSchema);

const validationUser = (user) => {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
        email: Joi.string().required(),
        password: Joi.string().required().min(6)
    });
    return schema.validate(user);
};

module.exports = { Users, validationUser };
