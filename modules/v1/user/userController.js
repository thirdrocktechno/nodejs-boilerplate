const userUtils = require('./userUtils')
const passwordHash = require('password-hash')
const {CODE} = require('../../../config/constants')

const userCtr = {}

userCtr.login = async (req, res) => {
    try {
        const {email, password, deviceId} = req.body

        const userInfo = {
            password,
            email,
        }
        const result = await userUtils.login(userInfo, deviceId);
        res.header('Authorization', `Bearer ${result.token}`);
        delete result.token;
        return res.status(CODE.SUCCESS).json({message : req.t('MSG_LOGIN_SUCCESS'), result})
    } catch (error) {
        return res.status(error.code || CODE.ERROR.INTERNAL_SERVER_ERROR).json({error: error.error || req.t('ERR_INTERNAL_SERVER')})
    }
}

userCtr.register = async (req, res) => {
    try {
        const {fullName, email, password} = req.body

        const userInfo = {
            name: fullName,
            password: passwordHash.generate(password, {algorithm: 'sha512'}),
            email,
        }
        const isEmailExist = await userUtils.getUserByEmail(email)
        if (isEmailExist) {
            return res.status(CODE.ERROR.BAD_REQUEST).json({error: req.t('EMAIL_ALREADY_EXIST')})
        }
        const newUser = await userUtils.register(userInfo)
        return res.status(CODE.CREATED).json({message: req.t('MSG_REGISTRATION_SUCCESS'), data: {id: newUser.id, }})
    } catch (error) {
        return res.status(error.code || CODE.ERROR.INTERNAL_SERVER_ERROR).json({error: error.error || req.t('ERR_INTERNAL_SERVER')})
    }
}

module.exports = userCtr
