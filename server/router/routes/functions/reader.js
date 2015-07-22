var path = require('path');
var appDir = path.dirname(require.main.filename);

var reader = {
    'get': function(req, res){
        var book_id = req.params.id;

        //correct this path for registered users when functionality implemented
        var bookPath = path.join(appDir, '..', "/uploads/"+req.cookies.guestuser+"/", book_id);

        res.sendFile(bookPath);
    }
};

module.exports = reader;
