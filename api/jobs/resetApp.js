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
    schedule.scheduleJob('0 6 */1 * *' , async function () {
        if (process.env.NODE_APP_INSTANCE == 1) {
        
          console.log('Iniciou a job')
        
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
                console.log('Erro no bloco de remoção/criação de usuários')
                res.status(500).json('error')
            }
        
            const scraping = async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36');
                await page.goto('https://www.tecmundo.com.br/');
                
                const elements = await page.$$('#listaMaisLidasHoje > div');

                const links = []

                for(const element of elements) {
                    
                    links.push(await page.evaluate(el => el.querySelector("div > article > div > h3 > a")
                        .getAttribute("href"), element));
                }

                for (const link of links) {
                    await page.goto(link);
                    //get title
                    const title = await page.$eval('#js-article-title', title => title.textContent);

                    //get summary
                    let summary = '';
                    try {
                        summary = await page.$eval('#js-main > div.z--container > article > div.tec--article__body-grid > div.tec--article__body.z--px-16 > p:nth-child(1)', summary => summary.textContent);
                    } catch (error) {

                    }

                    //get image
                    const imgUrl = await page.$eval('#js-article-image > picture > img', img => img.getAttribute("data-src"));
                    const getExt = imgUrl.split('.')
                    const getLastPart = getExt[getExt.length-1]
                    let ext = '';
                    ext = getLastPart.includes('?') ? getLastPart.split('?')[0] : getLastPart

                    await page.goto(imgUrl);

                    let imagemName = `imagem_${Date.now()}.${ext}`
                    let cover = `uploads/${imagemName}`
                    await page.screenshot({ path: path.join(__dirname, `../${cover}`) });
                    await page.goBack();

                    //get image
                    const content = await page.$eval('#js-main > div > article > div.tec--article__body-grid > div.tec--article__body', content => content.innerHTML.replaceAll('data-src=', 'src='));

                    const userDoc = await app.modelUser.findOne({username:"teste"});
                
                    await app.modelPost.create({
                        title,
                        summary,
                        content,
                        cover,
                        author: userDoc._id
                    });
                    
                }
                await browser.close()
            };

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

            try {
                await scraping();
            } catch(error) {
                console.log('Erro ao realizar o scraping...')
                console.log(error)
            }
            console.log('finalizou a excução da job')
        }
    })
}