module.exports = function (app) {
    app.use('/api/library', require('./routes/library'));
    app.use('/api/login', require('./routes/login'));
    app.use('/api/session', require('./routes/session'));
    app.use('/api/upload', require('./routes/upload'));
    app.use('/api/reader', require('./routes/reader'));
};
