define(function(require){
    'use strict';

    var Dialog = require('views/dialog'),
        DialogModel = require('models/dialog'),
        $ = require('jquery'),
        JST = require('templates');

    describe('Dialog View', function(){
        beforeEach(function(){
            sinon.spy(Dialog.prototype, 'render');
            this.template = JST['app/scripts/templates/dialog.hbs'];
            this.dialog = new Dialog({title: 'Test', message: 'Dialog message'});
        });

        afterEach(function(){
            Dialog.prototype.render.restore();
        });

        it('should have a proper className property', function(){
            expect(this.dialog.className).to.equal('dialog hidden');
        });

        it('should have a DialogModel instance in model property', function(){
            expect(this.dialog.model).to.be.instanceof(DialogModel);
        });

        it('should have a proper template', function(){
            expect(this.template()).to.be.equal(this.dialog.template())
        });

        describe('On initialize', function(){
            it('should set model properties', function(){
                expect(this.dialog.model.get('title')).is.a('string').and.to.equal('Test');
                expect(this.dialog.model.get('message')).is.a('string').and.to.equal('Dialog message');
            });

            it('should call render function', function(){
                expect(this.dialog.render.called).to.be.true;
            });
        });

        describe('After render', function(){
            it('should have a title displayed', function(){
                expect(this.dialog.$('h4')).to.have.text('Test');
            });

            it('should have a message displayed', function(){
                expect(this.dialog.$('p')).to.have.text('Dialog message');
            })
        });

        describe('Timed showing/hiding', function(){
            beforeEach(function(){
                sinon.spy($.fn, 'removeClass');
                sinon.spy($.fn, 'addClass');
                this.clock = sinon.useFakeTimers();
            });

            afterEach(function(){
                $.fn.removeClass.restore();
                $.fn.addClass.restore();
                this.clock.restore();
            });

            it('should be able to show itself', function(){
                this.dialog.show();

                expect(this.dialog.$el).to.not.have.class('hidden');
                expect($.fn.removeClass.called).to.be.true;
            });

            it('should be able to hide itself after x seconds', function(){
                this.dialog.show();

                expect(this.dialog.$el).to.not.have.class('hidden');
                expect($.fn.removeClass.called).to.be.true;

                //thick the clock by view delay property + 1ms
                this.clock.tick(this.dialog.delay + 1);

                expect(this.dialog.$el).to.have.class('hidden');
                expect($.fn.addClass.called).to.be.true;
            });

            it('should destroy itself after hide', function(){
                sinon.spy(this.dialog, 'remove');
                this.dialog.hide();

                expect($.fn.addClass.called).to.be.true;

                this.clock.tick(this.dialog.delay + 1001);

                expect(this.dialog.remove.called).to.be.true;
            });
        })

    });
});