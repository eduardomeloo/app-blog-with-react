const fs = require('fs');
const jwt = require('jsonwebtoken');
module.exports = app => {
    const saveArticle = async (req, res) =>  {

        let cover = null;

        if(req.file) {
            const {originalname, path} = req.file
            const parts = originalname.split('.');
            const extension = parts[parts.length - 1]
            const newPath = path + '.' + extension;
            fs.renameSync(path, newPath);
            cover = newPath;
        }

        const {token} = req.cookies;

        jwt.verify(token, process.env.SECRET_KEY, {}, async (err, info) => {
            if (err) throw err;
            const {title, summary, content} = req.body;
            if(!req.body.id) {
                //Cria novo artigo
                const postDoc = await app.modelPost.create({
                    title,
                    summary,
                    content,
                    cover,
                    author: info.id
                });

                res.json(postDoc);
            } else {
                const postDoc = await app.modelPost.findById(req.body.id);
                const isAuthor = JSON.stringify(postDoc.author) === JSON.stringify(info.id)

                if(req.file && postDoc.cover) {
                    if (fs.existsSync(postDoc.cover)) {
                        fs.unlink(postDoc.cover, (err) => {
                          if (err) throw err;
                          console.log('Arquivo removido com sucesso!');
                        });
                      } else {
                        console.log('Arquivo não encontrado');
                      }
                }

                if(!isAuthor) {
                    return res.status(400).json('you are not the author');
                }

                await postDoc.updateOne({
                    title,
                    summary,
                    content,
                    cover: req.file ? cover : postDoc.cover
                })

                res.status(200).json();
            }
        });        
    }

    const getArticles = async (req, res) => {
        res.json(
            await app.modelPost.find()
                .populate('author', ['username'])
                .sort({createdAt: -1})
                .limit(10)
        );
    }

    const getArticlesById = async (req, res) => {
        const {id} = req.params;
        res.json(await app.modelPost.findById(id).populate('author', ['username']));
    }

    return {saveArticle, getArticles, getArticlesById}
}