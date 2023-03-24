module.exports = app => {  
    app.post('/register', app.api.auth.register)
    app.post('/login', app.api.auth.login)
    app.post('/logout', app.api.auth.logout)
    app.get('/profile', app.api.auth.profile)
    
}