const mongoose = require('mongoose');
const Schema = mongoose.Schema

mongoose.set('useCreateIndex', true)

/**
 * User Schema
 * @private
 */
const BookSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            maxlength: 128,
            required: true,
            trim: true,
        },
        description: {
            type: String,
            required: true,
            trim: true,
        },
        isbn: {
            type: String,
            required: true,
            maxlength: 100,
            index: true,
        },
        genre: {
            type: String,
            index: true,
            trim: true,
            maxlength: 128,
            required: true,
        },
        price: {
            type: Number,
            trim: true,
            required: true,
        },
        totalPages: {
            type: Number,
            trim: true,
            maxlength: 128,
            required: true,
        },
        publication: {
            type: String,
            trim: true,
            maxlength: 128,
            required: true,
        },
        publishedAt: {
            type: Date,
            trim: true,
            maxlength: 128,
            required: true,
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true
        }, 
        userId: {
            type: Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Book', BookSchema)
