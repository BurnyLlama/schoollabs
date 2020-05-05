// Validate
const Joi = require('@hapi/joi');

const login = (data) => {
    const loginSchema = Joi.object({
        user: Joi.string()
            .alphanum()
            .min(2)
            .required(),
        pass: Joi.string()
            .min(1)
            .required()
    });
    return loginSchema.validate(data);
};

module.exports.login = login;