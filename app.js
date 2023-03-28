'use strict'

const fastify = require('fastify')
const authenticate = { realm: 'Example' }
require('dotenv').config()

function build(opts = {}) {
    const app = fastify(opts)

    app.register(require('@fastify/basic-auth'), { validate, authenticate })

    async function validate(username, password, request, reply) {
        if (username !== process.env.HTTP_USERNAME || password !== process.env.HTTP_PASSWORD) {
            return new Error('Authentication failed')
        }
    }

    app.after(() => {
        app.route({
            method: 'GET',
            url: '/',
            onRequest: app.basicAuth,
            handler: async (request, reply) => {
                return { hello: 'world' }
            }
        })
    })
    return app
}

module.exports = build