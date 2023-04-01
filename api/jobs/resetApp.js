const schedule = require('node-schedule');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const fs = require('fs').promises;
const path =  require('path');
const puppeteer = require('puppeteer');

dotenv.config();

//Executa todos os dias às 23h '0 23 */1 * *'
//Executa todos os dias às 6h  '0 6 */1 * *'
//Executa todos os dias de 1 em 1 minuto '* * * * *'
//Executa todos os dias de 2 em 2 minutos '*/2 * * * *'
//Executa todos os dias de 30 em 30 segundos */30 * * * * *

module.exports = app => {
    //schedule.scheduleJob('*/30 * * * * *' , async function () {
        //if (process.env.NODE_APP_INSTANCE == 1) {}
        /*
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
        */
        (async () => {
            console.log('entrou aqui')
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto('https://www.tecmundo.com.br/');
            
            const elements = await page.$$('#listaMaisLidasHoje > div');

            const links = []

            for(const element of elements) {
                
                links.push(await page.evaluate(el => el.querySelector("div > article > div > h3 > a")
                    .getAttribute("href"), element));
            }

            for (const link of links) {
                await page.goto(link);
                const title = await page.$eval('#js-article-title', title => title.textContent);
                console.log(title)
                const img = await page.$eval('#js-article-image > picture > img', img => img.getAttribute("data-src"));
                console.log(img)
                const content = await page.$eval('#js-main > div > article > div.tec--article__body-grid > div.tec--article__body', content => content.innerHTML);
                console.log(content)
                // newsData.push({ title, author, content });
                // await page.goBack();
            }

        })();

            
            // await browser.close();
            // return newsData;
        

        //await scrapeNews()
        /*
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
    */
  //  })
}