const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)

/**
 * User Schema
 * @private
 */
const UserSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            maxlength: 128,
            required: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            maxlength: 500,
        },
        fullName: {
            type: String,
            index: true,
            trim: true,
            maxlength: 128,
        },
    },
    {
        timestamps: true,
    }
)

UserSchema.index({fullName: 1})
UserSchema.index({email: 1}, {unique: true})

module.exports = mongoose.model('User', UserSchema)
