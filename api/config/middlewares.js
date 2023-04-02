const express      = require('express');
const cors         = require('cors');
const cookieParser = require('cookie-parser');
const history      = require('connect-history-api-fallback');
const path         = require('path');

module.exports = app => {
    app.use(cors({
      origin: ['https://www.appblog.eduardopmelo.com.br', 'https://appblog.eduardopmelo.com.br'],
      credentials: true
    }));
    app.use(express.json());
    app.use(cookieParser());
    app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
    app.use(history());
    app.use(express.static(path.join(__dirname, '../build/')))
}