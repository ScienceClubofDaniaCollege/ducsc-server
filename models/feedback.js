const Joi = require('@hapi/joi');
const mongoose = require('mongoose');
// creating schema and model
const memberSchema = new mongoose.Schema({
    name: {type: String, required: true, lowercase: true},
    email: {type: String, required: true, lowercase: true},
    message: {type: String, required: true}
});

// setting model
const Feedback = mongoose.model('feedback', memberSchema);
// Joi validation
const validateFeedback = (feedbackInfo) => {
    const schema = {
            name: Joi.string().min(2).max(50).required(),
            email: Joi.string().email().min(2).max(50).required(),
            message: Joi.string().max(255).required()
    }
    return Joi.validate(feedbackInfo, schema);
}

exports.validate = validateFeedback;
exports.Feedback  = Feedback ;