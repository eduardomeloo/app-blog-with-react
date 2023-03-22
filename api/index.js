require('dotenv').config();
const cors = require('cors')
const app = require('express')();
const consign = require('consign');
const path = require('path');

app.use(cors())

consign({cwd: path.join(__dirname) })
    .include('/api')
    .then('/routes/routes.js')
    .into(app)

app.listen(process.env.SERVER_PORT || 4001, () => {
    console.log(`Backend Executanto na porta: ${process.env.SERVER_PORT || 4001}`);
})