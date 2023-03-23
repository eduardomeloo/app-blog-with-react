require('dotenv').config();
const app = require('express')();
const consign = require('consign');
const path = require('path');
app.modelUser = require(path.join(__dirname, '/db/models/User'));

consign({cwd: path.join(__dirname) })
    .include('/api')
    .then('/config')
    .then('/routes/routes.js')
    .into(app)

app.listen(process.env.SERVER_PORT || 4001, () => {
    console.log(`Backend Executanto na porta: ${process.env.SERVER_PORT || 4001}`);
})