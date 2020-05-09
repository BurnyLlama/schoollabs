// Validate
const Joi = require('@hapi/joi');

const login = (data) => {
    const schema = Joi.object({
        user: Joi.string()
            .min(2)
            .required(),
        pass: Joi.string()
            .min(1)
            .required()
    });
    return schema.validate(data);
};

const register = (data) => {
    const schema = Joi.object({
        name: Joi.string()
            .min(2)
            .required(),
        pass: Joi.string()
            .min(1)
            .required(),
        email: Joi.string()
            .email()
            .required(),
        title: Joi.string()
            .alphanum()
            .min(2)
            .required()
    });
    return schema.validate(data);
};

const changePassAdmin = (data) => {
    const schema = Joi.object({
        user: Joi.string()
            .min(2)
            .required(),
        pass: Joi.string()
            .min(1)
            .required()
    });
    return schema.validate(data)
};

module.exports.login = login;
module.exports.register = register;
module.exports.changePassAdmin = changePassAdmin;