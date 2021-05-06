const logger = require('../../../helper/logger');
const deviceUtils = require('./deviceUtils');
const { CODE } = require('../../../config/constants');

const deviceCtr = {};

deviceCtr.create = async (req, res) => {
  try {
    const {
      deviceType,     
      appIdentifier,
      appVersion,
      deviceToken,
      browserInfo,
    } = req.body;

    const deviceInfo = {
      deviceType: deviceType || null,
      appIdentifier: appIdentifier || null,
      appVersion: appVersion || null,
      deviceToken: deviceToken || null,
      browserInfo: browserInfo || null,
    };

    const deviceData = await deviceUtils.create(deviceInfo);
    return res.status(CODE.SUCCESS).json({message: req.t('MSG_DEVICE_ADDED'), deviceData});
  } catch (error) {
    return res.status(error.code || CODE.ERROR.INTERNAL_SERVER_ERROR).json({error: error.error || req.t('ERR_INTERNAL_SERVER')})
  }
};

module.exports = deviceCtr;
