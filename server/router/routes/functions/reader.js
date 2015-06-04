var EPub = require('epub');
var EPubParser = require('epub-parser');
var path = require('path');
var appDir = path.dirname(require.main.filename);

var reader = {
    'get': function(req, res){
        var book_id = req.params.id;

        var bookPath = path.join(appDir, '..', "/uploads/", book_id);

        this.epubData;

        this.epub = new EPub(bookPath,  "/image/", "/articlewebroot/");
        this.epubParser = EPubParser.open(bookPath, function(err, epubData){
            this.epubData = epubData;
        });
        this.epub.on("error", function(err){
            console.log("ERROR\n-----");
            throw err;
        });

        var self = this;
        this.epub.on("end", function(err) {
            console.log("METADATA:\n");
            console.log(epub.metadata);

            console.log("\nSPINE:\n");
            console.log(epub.flow);

            console.log("\nTOC:\n");
            console.log(epub.toc);

            epub.flow.forEach(function(chapter, index){
                console.log(chapter.id);
            });


            // get first chapter
            self.epub.getChapter(self.epub.flow[2].id, function (err, data) {
                if (err) {
                    console.log(err);
                    return;
                }

                res.send(data);
            });
        });

        this.epub.parse();
    },
    'getImage': function(req, res){
        var image_id = req.params.image_id;
        this.epub.getImage(image_id, function(err, data, mimeType){
            console.log(err || data);
            console.log(mimeType)
            res.send(data)
        });
    }
};

module.exports = reader;
