const mongoose = require('mongoose');
const Schema = mongoose.Schema

mongoose.set('useCreateIndex', true)

/**
 * User Schema
 * @private
 */
const DeviceSchema = new mongoose.Schema(
    {
        deviceType: {
            type: String,
            maxlength: 128,
            required: true,
            trim: true,
        },
        appIdentifier: {
            type: String,
            trim: true,
        },
        appVersion: {
            type: String,
            maxlength: 100,
            index: true,
        },
        deviceToken: {
            type: String,
            trim: true,
            reqiored: true
        },
        browserInfo: {
            type: String,
            trim: true,
        },
        userId: {
            type: Schema.Types.ObjectId, 
            ref: 'User'
        },
        isActive: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Device', DeviceSchema)
