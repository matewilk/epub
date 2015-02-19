module.exports = function (app) {
    app.use('/library', require('./routes/library'));
    app.use('/login', require('./routes/login'));
};
