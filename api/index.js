require('dotenv').config();
const express = require('express');
const app = express();
const consign = require('consign');
const path = require('path');

consign({cwd: path.join(__dirname)})
    .include('/api')
    .then('/routes')
    .into(app)

app.listen(process.env.SERVER_PORT || 4001, () => {
    console.log(`Backend Executanto na porta: ${process.env.SERVER_PORT || 4001}`);
})