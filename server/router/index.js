module.exports = function (app) {
    app.use('/library', require('./routes/library'));
};
