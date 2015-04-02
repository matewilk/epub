define(function(require){

    var LoginForm = require('views/login'),
        LoginModel = require('models/login'),
        FormView = require('views/form'),
        JST = require('templates'),
        $ = require('jquery');

    describe("Login Form", function(){
        beforeEach(function(){
            sinon.stub(FormView.prototype, 'submitForm');
            sinon.spy(LoginForm.prototype, 'listenTo');
            sinon.spy($.fn, 'html');
            sinon.spy(LoginForm.prototype, 'template');
            sinon.spy(LoginForm.prototype, 'login');

            this.template = JST['app/scripts/templates/login.hbs'];

            this.loginForm = new LoginForm();
        });

        afterEach(function(){
            FormView.prototype.submitForm.restore();
            LoginForm.prototype.listenTo.restore();
            $.fn.html.restore();
            LoginForm.prototype.template.restore();
            LoginForm.prototype.login.restore();
        });

        it("should inherit from FormView", function(){
            expect(this.loginForm).to.be.instanceof(FormView);
        });

        it("should have a proper template",function(){
            expect(this.loginForm.template()).to.equal(this.template());
        });

        it("should have an instance of LoginModel as a property", function(){
            expect(this.loginForm.model).to.be.instanceof(LoginModel);
        });

        describe("On initialize", function(){
            it("should listen to model sync event", function(){
                expect(this.loginForm.listenTo.calledWith(this.loginForm.model, 'sync', this.loginForm.success)).to.be.true;
            });

            it("should render the template", function(){
                this.loginForm.render();
                expect(this.loginForm.$el.html.called).to.be.true;
                expect(this.loginForm.template.called).to.be.true;
            });
        });

        describe("On form submit", function(){
            beforeEach(function(){
                this.loginForm.render();
                this.loginForm.$el.find('form').submit();
            });
            it("should call login function", function(){
                expect(this.loginForm.login.called).to.be.true;
            });

            it("should call submitForm function with form id", function(){
                expect(this.loginForm.submitForm.calledWith('login')).to.be.true;
            });
        });

        describe("On model sync", function(){
            it("should call success function");
        })
    });

});