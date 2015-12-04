var sinon = require('sinon'),
    WordnikAdapter = require('../../router/routes/adapters/wordnikAdapter'),
    stream = require('stream'),//.PassThrough,
    should = require('should'),
    assert = require('assert'),
    http = require('http');

describe('Wordnik Adapter Spec', function(){
    describe('Call definitions endpoint', function(){
        beforeEach(function(){
            this.phrase = 'test-word';
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
            var expected = [{ hello: 'world' }],
                response = new stream.PassThrough();

        	response.write(JSON.stringify(expected));
            response.end();

            var request = new stream.PassThrough();

            this.request.callsArgWith(1, response).returns(request);

            WordnikAdapter.getDefinitions(this.phrase, function(resp) {
                assert(this.request.calledWith(this.options));
                done();
            }.bind(this));
        });

        it("should send http request successfully", function(){
            var expected = [{ hello: 'world' }],
                response = new stream.PassThrough();

        	response.write(JSON.stringify(expected));
            response.end();

            var request = new stream.PassThrough();

            this.request.callsArgWith(1, response).returns(request);

            WordnikAdapter.getDefinitions(this.phrase, function(resp) {
                assert.deepEqual(resp, expected);
                done();
            });
        })

        it("should filter out response data");
    });
});
