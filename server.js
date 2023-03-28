'use strict'

const pino = require('pino')
const server = require('./app')({
    logger: {
        level: 'info',
        transport: {
            target: 'pino-pretty'
        }
    }
})

// Must listen on 0.0.0.0 when deploying to Docker as it does not default to exposing mapped ports to localhost
server.listen(3000, '0.0.0.0', (err, address) => {
    if (err) {
        server.log.error(err)
        process.exit(1)
    }
    console.log(`🚀 Server ready`)
    console.log(`Running on ${address}`)
})