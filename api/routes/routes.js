module.exports = app => {  
    app.route('/register')
        .post(app.api.auth.register)
}