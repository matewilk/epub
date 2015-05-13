var files = {
    'post': function(req, res){
        if(req.app.fileuploaddone === true){
            console.log(req.files);
            res.end("File uploaded.");
            req.app.fileuploaddone = false;
        }
    }
};

module.exports = files;
