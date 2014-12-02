var express = require('express');
var router = express.Router();
var EPub = require("epub");


var epub = new EPub("/home/wolfie/Workspace/Projects/epub/books/alice.epub",  "/image/", "/articlewebroot/");
epub.on("error", function(err){
    console.log("ERROR\n-----");
    throw err;
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.get('/library', function(req, res){
    res.contentType('application/json');
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.send({title: "Super book", author: "Mateusz Wilk", isbn: "33987429834"});
});

router.get('/book', function(req, res) {

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

});

router.get('/image/:image_id/:folder/:image', function(req, res){
    var image_id = req.params.image_id;
    epub.getImage(image_id, function(err, data, mimeType){
        console.log(err || data);
        console.log(mimeType)
        res.send(data)
    });
});

module.exports = router;
