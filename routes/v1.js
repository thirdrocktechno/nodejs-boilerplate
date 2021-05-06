const express = require('express')
const path = require('path')
const router = express.Router()
const l10n = require('jm-ez-l10n');
const v = `../modules/${path.basename(__filename, '.js')}`

router.use((req, res, next) => {
    console.debug(req.connection.remoteAddress, 'GET IP OF THE REQUESTED USER')
    next()
})

/* eslint import/no-dynamic-require: 0 */
router.use('/user', require(`${v}/user/userRoute`));
router.use('/device', require(`${v}/device/deviceRoute`));
router.use('/book', require(`${v}/book/bookRoute`));

router.use('/health-check', (req, res) => {
    res.send(200)
})

router.all('/*', (req, res) => {
    return res.status(404).json({
        error: l10n.t('ERR_URL_NOT_FOUND'),
    })
})

module.exports = router
