const Joi = require("joi").extend(require("@joi/date"));
const schema = Joi.object({
  name: Joi.string().min(2).max(255).required(),
    description: Joi.string().min(3).max(255),
    tag: Joi.string().min(2).max(255),
    place: Joi.string().min(2).max(255).required(),
    time: Joi.date().format("YYYY-MM-DD HH:mm:ssZZ").required(),
});

module.exports = schema;