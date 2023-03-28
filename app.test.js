'use strict'

const { test } = require('tap')
const build = require('./app')
require('dotenv').config()

test('requests the "/" route', async t => {
    const app = build()
    const response = await app.inject({
        method: 'GET',
        url: '/',
        headers:{
            Authorization: 'Basic ' + Buffer.from(process.env.HTTP_USERNAME + ':' + process.env.HTTP_PASSWORD).toString('base64')
        }
    })
    t.equal(response.statusCode, 200, 'returns a status code of 200')
})