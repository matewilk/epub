var filesDb = require('../../../database/modules/files');
var EPub = require('epub');
var path = require('path');
var appDir = path.dirname(require.main.filename);

var reader = {
    'get': function(req, res){
        var book_id = req.params.id;

        var epub = new EPub(path.join(appDir, '..', "/uploads/", book_id),  "/image/", "/articlewebroot/");
        epub.on("error", function(err){
            console.log("ERROR\n-----");
            throw err;
        });

        epub.on("end", function(err) {
            console.log("METADATA:\n");
            console.log(epub.metadata);

            console.log("\nSPINE:\n");
            console.log(epub.flow);

            console.log("\nTOC:\n");
            console.log(epub.toc);

            // get first chapter
            epub.getChapter(epub.spine.contents[0].id, function (err, data) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log("\nFIRST CHAPTER:\n");
                console.log(data.substr(0, 512) + "..."); // first 512 bytes

                res.send(data);
            });
        });

        epub.parse();
    }
};

module.exports = reader;
