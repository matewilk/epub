define('epubjsMock', function () {
    return {
        mock: 'mock'
    };
});

define(function(require){
    'use strict';



    var ReaderView = require('views/pages/reader'),
        JST = require('templates'),
        ePub = require('epubjs');


    describe('Reader View', function(){
        beforeEach(function(){
            ePub = sinon.stub();
            ePub.renderTo = sinon.spy();

            this.template = JST['app/scripts/templates/reader.hbs'];
            this.iFramePlaceholder = $('<div id="iframe-placeholder"></div>');

            var bookId = 'book-id';
            this.reader = new ReaderView(bookId);
        });

        it('should have an id attribute with "reader" value', function(){
            expect(this.reader.id).to.equal('reader');
        });

        it('should have a proper template', function(){
            expect(this.reader.template()).to.equal(this.template());
        });

        describe('On initialize', function(){
            it('should create a ifrime placeholder', function(){
                expect(this.reader.area).to.deep.equal(this.iFramePlaceholder);
            });

            it('should call ePub constructor with params', function(){
                sinon.assert.calledOnce(ePub);
            });

            xit('should render ePub view to ifrime placeholder', function(){
                expect(ePub.renderTo.called).to.be.true;
            });
        });

        describe('On render', function(){
            beforeEach(function(){
                sinon.spy($.fn, 'html');
                this.reader.render();
            });
            afterEach(function(){
                $.fn.html.restore();
            });

            it('should render the template', function(){
                expect(this.reader.$el.html.calledWith(this.reader.template())).to.be.true;
            });

            it('should append the ifrime placeholder to #area element', function(){
                expect(this.reader.$('#area')).to.exist;
                expect(this.reader.$('#area')).not.to.be.empty;
                expect(this.reader.$('#area')).to.have.descendants('div');
                expect(this.reader.$('#area').html.calledWith(this.reader.area)).to.be.true;
            });
        });

        describe('Page turn', function(){
            xit('should be able to turn to the next page', function(){

            });

            xit('should be able to turn to the previous page', function(){

            });
        });
    });
});
