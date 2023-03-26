const fs = require('fs');
const jwt = require('jsonwebtoken');
module.exports = app => {
    const saveNewArticle = async (req, res) =>  {

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

            const postDoc = await app.modelPost.create({
                title,
                summary,
                content,
                cover,
                author: info.id
            });

            res.json(postDoc);
        });        
    }

    const getArticles = async (req, res) => {
        res.json(await app.modelPost.find().populate('author', ['username']));
    }
    return {saveNewArticle, getArticles}
}