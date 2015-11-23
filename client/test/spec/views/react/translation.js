define(function(require){
    'use strict';

    var React = require('react'),
        TestUtils = React.addons.TestUtils,
        Translation = require('views/react/translation'),
        apiUrls = require('globals/urls');

    describe('React', function(){
        describe('Translation', function(){
            let component = null;
            let server = sinon.fakeServer.create();
            server.autoRespond = true;
            describe('Initialize component', function(){
                beforeEach(function(){
                    component = TestUtils.renderIntoDocument(
                        React.createElement(Translation, {word: "testword", url: apiUrls.getUrl("translate")})
                    );
                });

                it('should have proper initial state values', function(){
                    var initialState = component.getInitialState();
                    expect(initialState).to.deep.equal({word: '', translation: '', pronunciation: ''});
                });

                it('should have proper initial properties', function(){
                    var props = component.props;
                    expect(props).to.deep.equal({url: '/api/translate', word: 'testword'});
                });

                it("should call appriopriate API endpoint on mount", function(){
                    //already tested above ?
                });

                it("should have proper css classes", function(){
                    expect(component.getDOMNode().className).to.equal('translation');
                });

                it('should show the word to translate on render', function(){
                    expect($(component.getDOMNode())).to.have.text('testword');
                });
            })


            describe('Successfull API call', function(){
                beforeEach(function(){
                    server.respondWith("POST", "/api/translate", [
                        200,
                        { "Content-Type": "application/json" },
                        JSON.stringify({word: 'testword', translation: 'translation for the testword'})
                    ]);

                    component = TestUtils.renderIntoDocument(
                        React.createElement(Translation, {word: "testword", url: apiUrls.getUrl("translate")})
                    );
                });

                it('should fill in properties after successfull API call', function(){
                    server.respond();
                    expect(component.state.data).to.deep.equal({word: 'testword', translation: 'translation for the testword'});
                });

                it('should show dictionary data after successfull API call', function(){
                    server.respond();
                    //expect($(component.getDOMNode())).to.have.text('translation for the testword');
                });

                it('should show appriopriate message if no data was returned after successfull API call', function(){

                });
            });

            describe('unsuccessfull API call', function(){
                beforeEach(function(){
                    server.respondWith("POST", "/api/translate", [
                        500,
                        { "Content-Type": "application/json" },
                        JSON.stringify({word: 'testword', translation: 'translation for the testword'})
                    ]);

                    component = TestUtils.renderIntoDocument(
                        React.createElement(Translation, {word: "testword", url: apiUrls.getUrl("translate")})
                    );
                });

                it('should display an error message if API call wass unsuccessfull', function(){
                    server.respond();
                    expect($(component.getDOMNode())).to.have.text('Server Error');
                });

                it('should show "try again" button on unsuccessfull API call', function(){

                });

                it('should trigger API request on "try again" click', function(){

                });
            });
        });
    })
});
