define(function(require){
    'use strict';

    var Dialog = require('views/dialogs/dialog'),
        animations = require('helpers/animations'),
        $ = require('jquery'),
        JST = require('templates');

    describe('Dialog View', function(){
        beforeEach(function(){
            this.clock = sinon.useFakeTimers();
            sinon.spy(animations, 'dialogShow');
            sinon.spy(animations, 'dialogHide');

            sinon.spy(Dialog.prototype, 'render');
            sinon.spy(Dialog.prototype, 'show');
            sinon.spy(Dialog.prototype, 'hide');

            this.template = JST['app/scripts/templates/dialog.hbs'];
            this.dialog = new Dialog({title: 'Test', message: 'Dialog message'});
        });

        afterEach(function(){
            this.clock.restore();
            animations.dialogShow.restore();
            animations.dialogHide.restore();

            Dialog.prototype.render.restore();
            Dialog.prototype.show.restore();
            Dialog.prototype.hide.restore();
        });

        it('should have a proper className property', function(){
            expect(this.dialog.className).to.equal('dialog absolute-centered');
        });

        it('should have a proper template', function(){
            expect(this.template()).to.be.equal(this.dialog.template())
        });

        describe('On initialize', function(){
            it('should set model properties', function(){
                expect(this.dialog.options.title).is.a('string').and.to.equal('Test');
                expect(this.dialog.options.message).is.a('string').and.to.equal('Dialog message');
            });

            it('should call render function', function(){
                expect(this.dialog.render.called).to.be.true;
            });
        });

        describe('After render', function(){
            it('should have a title displayed', function(){
                expect(this.dialog.$('p[id="title"] strong')).to.have.text('Test');
            });

            it('should have a message displayed', function(){
                expect(this.dialog.$('p[id="message"]')).to.have.text('Dialog message');
            })
        });

        describe('Timed showing/hiding', function(){
            it('should be able to show itself on initialize', function(){
                expect(this.dialog.show.called).to.be.true;
                expect(animations.dialogShow.called).to.be.true;
            });

            it('should be able to hide itself after x seconds', function(){
                expect(this.dialog.show.called).to.be.true;
                expect(animations.dialogShow.called).to.be.true;

                //thick the clock by view delay property + 1ms
                this.clock.tick(this.dialog.delay + 1);

                expect(this.dialog.hide.called).to.be.true;
            });

            //it is the responsibility of the helpers/animations now
            xit('should destroy itself after hide', function(){
                sinon.spy(this.dialog, 'remove');
                this.dialog.hide();

                expect($.fn.addClass.called).to.be.true;

                this.clock.tick(this.dialog.delay + 1001);

                expect(this.dialog.remove.called).to.be.true;
            });
        })

    });
});
