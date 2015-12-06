var http = require('http');

var wordnikAdapter = {
    getDefinitions: function(phrase, callback){
        var options = {
            host: 'api.wordnik.com',
            path: '/v4/word.json/'+phrase+'/definitions?api_key=716c5e8b8d1d028f2a00d0b17a00a64a3dbc5e39928819408',
            port: '80',
            method: 'GET'
        }

        var request = http.request(options, function(response){
            var body = "";
            response.on('data', function(data){
                body += data;
            });
            response.on('end', function(){
                callback(wordnikAdapter._parseData(body));
            });
        });
        request.on('error', function(e) {
            console.log('Problem with request: ' + e.message);
        });
        request.end();
    },

    _parseData: function(body){
        var responseJson = JSON.parse(body),
            response;

        if(responseJson.type === 'error')
        {
            //return error returned by wornik
            return JSON.stringify(responseJson);
        }
        //if response is not a array
        else if(!responseJson.map)
        {
            //return custom error
            return {type: 'error', error : 'malformed response'};
        }

        var response = responseJson.map(function(obj){
            var responseObj = {};
            responseObj['source'] = obj.attributionText;
            responseObj['partOfSpeech'] = obj.partOfSpeech;
            responseObj['definition'] = obj.text;
            responseObj['sequence'] = obj.sequence;
            responseObj['word'] = obj.word;

            return responseObj;
        });

        return JSON.stringify(response);
    }
}

module.exports = wordnikAdapter
