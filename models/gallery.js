const mongoose = require('mongoose');
const config = require('config');
const Joi = require('Joi');

const schema = new mongoose.schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    category: {type: String, required: true},
    date: {type: Date, required: true},
    src: {type: Object, required: true}
});

const Gallery = mongoose.model('gallery', schema);

// Joi validation
const validateGallery = (feedbackInfo) => {
    const schema = {
            title: Joi.string().min(2).max(50).required(),
            description: Joi.string().max(255).required(),
            category: Joi.string().max(255).required(),
            date: Joi.date().required(),
            src: Joi.object().required(),
    }
    return Joi.validate(feedbackInfo, schema);
}

exports.Gallery = Gallery;
exports.validate = validateGallery;