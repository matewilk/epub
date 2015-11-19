var translate = {
    'post': function(req, res){
        res.send({
            word: 'example',
            tranlation: 'definition of example word'
        });
    }
};

module.exports = translate;
