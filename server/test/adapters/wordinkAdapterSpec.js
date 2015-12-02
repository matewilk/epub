var sinon = require('sinon'),
    WordnikAdapter = require('../../router/routes/adapters/wordnikAdapter'),
    stream = require('stream'),//.PassThrough,
    should = require('should'),
    assert = require('assert'),
    http = require('http');

describe('Wordnik Adapter Spec', function(){
    describe('Call definitions endpoint', function(){
        beforeEach(function(){
            this.request = sinon.stub(http, 'request');
        });

        afterEach(function() {
    		http.request.restore();
    	});

        it("should send http request to the specified wordnik endpoint", function(done){
            var expected = { hello: 'world' },
                response = new stream.PassThrough();

        	response.write(JSON.stringify(expected));
            response.end();

            var request = new stream.PassThrough();

            this.request.callsArgWith(1, response).returns(request);

            WordnikAdapter.getDefinitions('test', function(resp) {
                assert.deepEqual(resp, expected);
                done();
            });
        });
    });
});
