var sinon = require('sinon'),
    WordnikAdapter = require('../../router/routes/adapters/wordnikAdapter'),
    stream = require('stream'),//.PassThrough,
    should = require('should'),
    assert = require('assert'),
    http = require('http');

describe('Wordnik Adapter Spec', function(){
    describe('Call "definitions" endpoint', function(){
        beforeEach(function(){
            this.phrase = 'test';
            this.options = {
                host: 'api.wordnik.com',
                path: '/v4/word.json/'+this.phrase+'/definitions?api_key=716c5e8b8d1d028f2a00d0b17a00a64a3dbc5e39928819408',
                port: '80',
                method: 'GET'
            }
            this.request = sinon.stub(http, 'request');
        });

        afterEach(function() {
    		http.request.restore();
    	});

        it("should send http request to the specified wordnik endpoint", function(done){
            var response = new stream.PassThrough();
        	response.write('[{}]');
            response.end();

            var request = new stream.PassThrough();

            this.request.callsArgWith(1, response).returns(request);

            WordnikAdapter.getDefinitions(this.phrase, function(resp) {
                assert(this.request.calledWith(this.options));
                done();
            }.bind(this));
        });

        it("should send http request and call '_parseData' successfully", function(done){
            sinon.spy(WordnikAdapter, '_parseData');
            var response = new stream.PassThrough();
        	response.write('[{}]');
            response.end();

            var request = new stream.PassThrough();

            this.request.callsArgWith(1, response).returns(request);

            WordnikAdapter.getDefinitions(this.phrase, function(resp) {
                assert(WordnikAdapter._parseData.called);
                done();
            });
        });

        it("should filter out response data", function(done){
            var wordnikResponseData = [
                {
                    "textProns": [],
                    "sourceDictionary": "ahd-legacy",
                    "exampleUses": [],
                    "relatedWords": [],
                    "labels": [],
                    "citations": [],
                    "word": "test",
                    "partOfSpeech": "noun",
                    "attributionText": "from The American Heritage® Dictionary of the English Language, 4th Edition",
                    "sequence": "0",
                    "text": "A procedure for critical evaluation; a means of determining the presence, quality, or truth of something; a trial:  a test of one's eyesight; subjecting a hypothesis to a test; a test of an athlete's endurance. ",
                    "score": 0
                }
            ]
            var expectedData = [
                {
                    source: 'from The American Heritage® Dictionary of the English Language, 4th Edition' ,
                    partOfSpeech: 'noun',
                    definition: "A procedure for critical evaluation; a means of determining the presence, quality, or truth of something; a trial:  a test of one's eyesight; subjecting a hypothesis to a test; a test of an athlete's endurance. ",
                    sequence: '0',
                    word: 'test'
                }
            ],
            response = new stream.PassThrough();

        	response.write(JSON.stringify(wordnikResponseData));
            response.end();

            var request = new stream.PassThrough();

            this.request.callsArgWith(1, response).returns(request);

            WordnikAdapter.getDefinitions(this.phrase, function(resp) {
                assert.deepEqual(resp, JSON.stringify(expectedData));
                done();
            });
        });

        it('should respond with error response on wordnik dictionary error', function(done){
            var errorResponse = JSON.stringify({type: "error", error: "test error"});
            response = new stream.PassThrough();
        	response.write(errorResponse);
            response.end();

            var request = new stream.PassThrough();

            this.request.callsArgWith(1, response).returns(request);

            WordnikAdapter.getDefinitions(this.phrase, function(resp) {
                assert.deepEqual(resp, errorResponse);
                done();
            });
        });

        it('should respond with error response on wordnik dictionary error', function(done){
            var serverMalformedResponse = JSON.stringify({error: "malformed response custom error"}),
                expected = {type: 'error', error : 'malformed response'};

            response = new stream.PassThrough();
        	response.write(serverMalformedResponse);
            response.end();

            var request = new stream.PassThrough();

            this.request.callsArgWith(1, response).returns(request);

            WordnikAdapter.getDefinitions(this.phrase, function(resp) {
                assert.deepEqual(resp, expected);
                done();
            });
        });
    });
});
