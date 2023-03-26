const fs = require('fs')
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
        
        const {title, summary, content} = req.body;

        const postDoc = await app.modelPost.create({
            title,
            summary,
            content,
            cover
        });

        res.json(postDoc);
    }

    const getArticles = async (req, res) => {
        //const posts = await app.modelPost.find();
        res.json(await app.modelPost.find());
    }
    return {saveNewArticle, getArticles}
}