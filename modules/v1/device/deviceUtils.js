const l10n = require('jm-ez-l10n');
const pjson = require('../../../package.json');
const Device = require('./../../../models/device.model');
const logger = require('../../../helper/logger');
const { CODE } = require('../../../config/constants');

const deviceUtils = {};

deviceUtils.create = async (deviceInfo) => {
  try {
    const { deviceToken } = deviceInfo;
    const device = { ...deviceInfo };

    const storedDevice = Device(device);
    const result = await storedDevice.save()

    if (result) {
      if (deviceToken) {
        await Device.updateOne({_id: result._id}, { deviceToken });
      }
      return { deviceId: result._id };
    }
    const errorObj = { code: CODE.ERROR.INTERNAL_SERVER_ERROR, error: l10n.t('ERR_INTERNAL_SERVER') };
    throw errorObj;
  } catch (error) {
    logger.info('******** ERROR :: User Utils :: addBook ********');
    logger.error(error);
    const errorObj = {code: CODE.ERROR.INTERNAL_SERVER_ERROR, error: l10n.t('ERR_INTERNAL_SERVER')}
    throw errorObj
  }
};

module.exports = deviceUtils;
