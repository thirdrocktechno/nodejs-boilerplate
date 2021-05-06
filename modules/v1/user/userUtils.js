const User = require('./../../../models/user.model');
const Device = require('./../../../models/device.model');
const sendEmail = require('./../../../helper/sendEmail');
const {EMAIL_SUBJECTS, EMAIL_TEMPLATES, CODE} = require('./../../../config/constants')
const passwordHash = require('password-hash');
const jwt = require('../../../helper/jwt');
const l10n = require('jm-ez-l10n');
const logger = require('./../../../helper/logger.js');
const mongoose = require('mongoose')

const userUtils = {}

userUtils.register = async (userInfo) => {
    try {
        logger.info('******** INFO :: User Utils - Register :: ********');
        const user = User(userInfo)
        const newUser = await user.save()

        const template = EMAIL_TEMPLATES.REGISTER
        const payLoad = {
            subject: EMAIL_SUBJECTS.VERIFICATION_EMAIL,
            userName: userInfo.name,
        }
        await sendEmail.sendMail(userInfo.email, template, payLoad)
        return newUser
    } catch (error) {
        logger.info('******** ERROR :: User Utils :: addBook ********');
        logger.error(error);
        const errorObj = {code: CODE.ERROR.INTERNAL_SERVER_ERROR, error: l10n.t('ERR_INTERNAL_SERVER')}
        throw errorObj
    }
}

userUtils.getUserByEmail = async (email) => {
    try {
        const user = await User.findOne({email})
        if (user) {
            return true
        }
        return false
    } catch (error) {
        logger.info('******** ERROR :: User Utils :: addBook ********');
        logger.error(error);
        const errorObj = {code: CODE.ERROR.INTERNAL_SERVER_ERROR, error: l10n.t('ERR_INTERNAL_SERVER')}
        throw errorObj
    }
}

userUtils.login = async (userInfo, deviceId) => {
    try {
        logger.info('******** INFO :: User Utils - Login :: ********');
        const {email, password} = userInfo

        const user = await User.findOne({email}, {fullName: 1, password: 1}, {lean: true})

        if (!user) {
            const errObj = {code: CODE.ERROR.NOT_FOUND, error: l10n.t('ERR_NO_USER_FOUND')}
            throw errObj
        }Schema = mongoose.Schema

        if (passwordHash.verify(password, user.password)) {

            await Device.updateOne({_id: mongoose.Types.ObjectId(deviceId)}, {userId: mongoose.Types.ObjectId(user._id), isActive: true});
            await Device.updateOne({$and: [{_id:{ $ne: mongoose.Types.ObjectId(deviceId)}}, {userId: mongoose.Types.ObjectId(user._id)}]}, { isActive: false});

            const token = jwt.getAuthToken({id: user._id, deviceId: deviceId})
            return {
                id: user._id,
                userName: user.fullName,
                email: user.email,
                token,
            }
        }
        const errorObj = {code: CODE.ERROR.BAD_REQUEST, error: l10n.t('ERR_PASSWORD_NOT_MATCHED')}
        throw errorObj
    } catch (err) {
        logger.info('******** ERROR :: User Utils :: Login ********');
        logger.error(err);
        const errorObj = {code: CODE.ERROR.INTERNAL_SERVER_ERROR, error: l10n.t('ERR_INTERNAL_SERVER')}
        throw errorObj
    }
}

module.exports = userUtils
