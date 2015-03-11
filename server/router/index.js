module.exports = function (app) {
    app.use('/api/library', require('./routes/library'));
    app.use('/api/login', require('./routes/login'));
};
