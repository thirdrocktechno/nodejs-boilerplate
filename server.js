require('dotenv').config()

const http = require('http')
const app = require('express')()
const helmet = require('helmet')
const nocache = require('nocache')
const connectToDb = require('./config/dbConnection')

// Translations
const l10n = require('jm-ez-l10n')

l10n.setTranslationsFile('en', './language/translation.en.json')
app.use(l10n.enableL10NExpress)

// const connectToDb = require('./helpers/connectToDb.helper');

app.use(helmet())
// app.use(helmet.hsts()); // Only used when SSL are there
app.use(nocache())
app.use(helmet.xssFilter())
app.use(helmet.dnsPrefetchControl())
app.use(
    helmet({
        frameguard: {
            action: 'deny',
        },
    })
)

// Body Parse
const bodyParser = require('body-parser')
const logger = require('./helper/logger.js');

app.use((error, req, res, next) => {
    if (error) {
        return res.status(400).json({error: req.t('ERR_GENRIC_SYNTAX')})
    }
    next()
})

const morgan = require('morgan');

app.use(morgan('combined'));

connectToDb()

app.use(bodyParser.json({limit: '100mb'}))

app.use(bodyParser.urlencoded({limit: '50mb', extended: true}))

// Express Settings
app.set('port', process.env.PORT)

app.all('/*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Request-Headers', '*')
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, Authorization, x-device-type, x-app-version, x-build-number'
    )
    res.header('Access-Control-Allow-Methods', 'GET, POST')
    if (req.method === 'OPTIONS') {
        res.writeHead(200)
        res.end()
    } else {
        next()
    }
})

app.use('/api/v1', require('./routes/v1'))

app.all('/*', (req, res) => {
    return res.status(404).json({
        error: l10n.t('ERR_URL_NOT_FOUND'),
    })
})

const server = http.createServer(app)

server.listen(process.env.PORT, '0.0.0.0', () => {
    logger.info(`Express server listening on port ${process.env.PORT}`)
})
