var sinon = require('sinon'),
    dictionary = require('../../router/routes/functions/dictionary'),
    WordnikAdapter = require('../../router/routes/adapters/wordnikAdapter'),
    should = require('should'),
    assert = require('assert');

describe('Dictionary Spec', function(){
    describe('POST endpoint (wordink call)', function(){
        beforeEach(function(){
            sinon.spy(String.prototype, 'toLowerCase');
            this.wordnikStub = sinon.stub(WordnikAdapter, 'getDefinitions');

            this.res = {};
            this.req = {
                body: {
                    word: 'Test-Phrase'
                }
            };
            this.spy = this.res.send = sinon.spy();
        });

        afterEach(function(){
            String.prototype.toLowerCase.restore();
            WordnikAdapter.getDefinitions.restore();
        });

        it("should lowercase a phrase passed in request body", function(){
            dictionary.post(this.req, this.res);
            assert(String.prototype.toLowerCase.called);
        });

        it("should call wordinkAdapter getDefinitions function", function(){
            dictionary.post(this.req, this.res);
            assert(WordnikAdapter.getDefinitions.called);
        });

        it("should send response in callback after getting the data from wordnikAdapter", function(done){
            WordnikAdapter.getDefinitions(this.phrase, function(resp) {
                this.res.send(resp);
                assert(this.res.send.calledWith('abc'));
                done();
            }.bind(this));

            dictionary.post(this.req, this.res);

            this.wordnikStub.yield('abc');
        });
    });
});
