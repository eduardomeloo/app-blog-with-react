const multer = require('multer');
const path         = require('path');
const uploadMiddleware = multer({ 
    dest: path.join(__dirname, '../uploads'),
    limits: { fieldSize: 25 * 1024 * 1024 } // 25MB
});

module.exports = app => {  
    app.post('/register', app.api.auth.register);
    app.post('/login', app.api.auth.login);
    app.post('/logout', app.api.auth.logout);
    app.get('/profile', app.api.auth.profile);
    app.post('/post', uploadMiddleware.single('file'), app.api.articles.saveArticle);
    app.put('/post', uploadMiddleware.single('file'), app.api.articles.saveArticle);
    app.get('/post', app.api.articles.getArticles);
    app.get('/post/:id', app.api.articles.getArticlesById);    
}