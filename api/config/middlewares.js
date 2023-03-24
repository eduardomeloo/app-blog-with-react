const express = require('express')
const cors = require('cors')
const path = require('path')

module.exports = app => {
    app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
    app.use(express.json())
}