var path = require('path');
var appDir = path.dirname(require.main.filename);

var reader = {
    'get': function(req, res){
        var book_id = req.params.id;

        var bookPath = path.join(appDir, '..', "/uploads/", book_id);

        res.sendFile(bookPath);
    }
};

module.exports = reader;
