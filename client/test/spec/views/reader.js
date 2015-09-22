define('epubjsMock', function () {
    //this is third-party (epubjs) mock
    var ePubMock = function(options){
        this.options = options;
        return {
            //these are epubjs functions, not reader view functions
            renderTo: sinon.spy(),
            nextPage: sinon.spy(),
            prevChapter: function(){return true},
            renderer: {
                prevPage: sinon.spy()
            }
        }
    };
    return sinon.spy(ePubMock);
});

define(function(require){
    'use strict';

    var ReaderView = require('views/pages/reader'),
        JST = require('templates'),
        ePub = require('epubjs');


    describe('Reader View', function(){
        beforeEach(function(){
            sinon.spy(ReaderView.prototype, 'nextPage');
            sinon.spy(ReaderView.prototype, 'prevPage');

            this.template = JST['app/scripts/templates/reader.hbs'];
            this.iFramePlaceholder = $('<div id="iframe-placeholder"></div>');

            this.bookId = 'book-id';
            this.reader = new ReaderView(this.bookId);
        });
        afterEach(function(){
            ReaderView.prototype.nextPage.restore();
            ReaderView.prototype.prevPage.restore();
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
                sinon.assert.calledWithExactly(ePub, "/api/reader/"+this.bookId, {restore: true});
            });

            it('should render ePub view to ifrime placeholder', function(){
                expect(this.reader.book.renderTo.calledOnce).to.be.true;
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
            beforeEach(function(){
                this.reader.render();
            });
            it('should be able to turn to the next page', function(){
                this.reader.$('#next').click();
                expect(this.reader.nextPage.calledOnce).to.be.true;
                expect(this.reader.book.nextPage.calledOnce).to.be.true;
            });

            it('should be able to turn to the previous page', function(){
                this.reader.$('#prev').click();
                expect(this.reader.prevPage.calledOnce).to.be.true;
                //expect(this.reader.book.nextPage.calledOnce).to.be.true;
            });
        });
    });
});
