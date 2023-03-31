require('dotenv').config();
const app = require('express')();
const consign = require('consign');
const path = require('path');
app.modelUser = require(path.join(__dirname, '/db/models/User'));
app.modelPost = require(path.join(__dirname, '/db/models/Post'));

//Deletar Registros
//(async () => await app.modelPost.deleteMany())();
//(async () => await app.modelUser.deleteMany())();

consign({cwd: path.join(__dirname) })
    .include('/api')
    .then('/config')
    .then('/routes/routes.js')
    .then('/jobs')
    .into(app)

app.listen(process.env.SERVER_PORT || 4001, () => {
    console.log(`Backend Executanto na porta: ${process.env.SERVER_PORT || 4001}`);
})