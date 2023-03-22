module.exports = app => {
    app.route('/test')
        .get(app.api.model.test)
}