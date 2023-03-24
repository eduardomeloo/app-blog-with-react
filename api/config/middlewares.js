const express      = require('express')
const cors         = require('cors')
const cookieParser = require('cookie-parser')

const path = require('path')

module.exports = app => {
    //app.use(cors({credentials: true, origin: 'http://localhost:3000'}))
    app.use(cors({origin: true, optionsSuccessStatus: 200, credentials: true }));
    app.options('*', cors({origin: true, optionsSuccessStatus: 200, credentials: true}));
    app.use(express.json())
    app.use(cookieParser())
}