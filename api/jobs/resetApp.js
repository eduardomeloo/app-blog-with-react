const schedule = require('node-schedule');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const fs = require('fs').promises;
const path =  require('path');

dotenv.config();

//Executa todos os dias às 23h '0 23 */1 * *'
//Executa todos os dias às 6h  '0 6 */1 * *'
//Executa todos os dias de 1 em 1 minuto '* * * * *'
//Executa todos os dias de 2 em 2 minutos '*/2 * * * *'
//Executa todos os dias de 30 em 30 segundos */30 * * * * *

module.exports = app => {
    schedule.scheduleJob('*/30 * * * * *' , async function () {
        
        await app.modelPost.deleteMany().then().catch(err => console.error(err));
        await app.modelUser.deleteMany().then().catch(err => console.error(err));

        try {
            const bcryptSalt = bcrypt.genSaltSync(10)
    
            const username = 'teste';
            const password = 'teste';
    
            const hashedPassword = bcrypt.hashSync(password, bcryptSalt);

            await app.modelUser.create({username, password: hashedPassword}).then().catch(err => console.error(err));
    
        } catch(err) {
            if(err) throw err;
            res.status(500).json('error')
        }
        
        try {
            const folderPath = path.join(__dirname, '../uploads')
            const files = await fs.readdir(folderPath);
            if(files.length > 0) {
                for (const file of files) {
                    await fs.unlink(path.resolve(folderPath, file));
                    console.log(`${folderPath}/${file} has been removed successfully`);
                }
            }
        } catch (err){
            console.log(err);
        }
    
    })
}
