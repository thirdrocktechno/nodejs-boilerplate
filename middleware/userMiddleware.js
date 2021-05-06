const _ = require('lodash')
const jwt = require('./../helper/jwt')
const User = require('./../models/user.model')
const Device = require('./../models/device.model')
const logger = require('./../helper/logger')
const l10n = require('jm-ez-l10n')
const {code} = require('./../config/constants')
const mongoose = require('mongoose')

const userMiddleware = {}

userMiddleware.loadUser = async (req, res, next) => {
    if (req.method !== 'OPTIONS') {
        const {headers} = req
        if (_.isEmpty(headers.authorization)) {
            res.status(CODE.ERROR.UNAUTHORIZED).json({error: req.t('ERR_UNAUTH')})
        } else {
            const decoded = jwt.decodeAuthToken(headers.authorization.replace('Bearer ', ''))
            if (decoded) {
                const {id, deviceId} = decoded
                // const model = table.ADMIN
                // const params = ['id, name, userName, email, password, isActive, isSuperAdmin, createdAt, updatedAt']
                // const condition = 'id = ? AND isActive = 1'
                // const values = [id]
                try {
                    const userInfo = await User.findById(mongoose.Types.ObjectId(id))
                    if (!userInfo) {
                        return res
                            .status(CODE.ERROR.UNAUTHORIZED)
                            .json({error: req.t('ERR_TOKEN_EXP'), isSessionExpired: true})
                    }

                    try {
                        const deviceInfo = await Device.findById(mongoose.Types.ObjectId(deviceId))
                        if (!deviceInfo) {
                            return res
                                .status(CODE.ERROR.UNAUTHORIZED)
                                .json({error: req.t('ERR_TOKEN_EXP'), isSessionExpired: true})
                        }
                        req.device = deviceInfo
                        req.user = userInfo
                        const input = req.body
                        Object.keys(input).forEach((k) => {
                            if (typeof input[k] === 'string') {
                                input[k] = input[k].trim()
                            }
                        })
                        next()
                    } catch (err) {
                        logger.error(err)
                        return res
                            .status(CODE.ERROR.UNAUTHORIZED)
                            .json({error: req.t('ERR_TOKEN_EXP'), isSessionExpired: true})
                    }
                } catch (err) {
                    logger.error(err)
                    return res
                        .status(CODE.ERROR.UNAUTHORIZED)
                        .json({error: req.t('ERR_TOKEN_EXP'), isSessionExpired: true})
                }
            } else {
                return res.status(CODE.ERROR.UNAUTHORIZED).json({error: req.t('ERR_TOKEN_EXP'), isSessionExpired: true})
            }
        }
    } else {
        next()
    }
}

module.exports = userMiddleware
