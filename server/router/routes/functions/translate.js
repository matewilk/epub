var wordnikAdapter = require('../adapters/wordnikAdapter');

var translate = {
    'post': function(req, res){
        var phrase = req.body.word ? req.body.word.toLowerCase() : '';
        var response = wordnikAdapter.getDefinitions(phrase, function(resp){
            res.send(resp);
        });
    }
};

module.exports = translate;
