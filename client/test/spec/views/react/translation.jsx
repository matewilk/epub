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

                    sinon.spy(Translation.prototype, 'callAjax');

                    component = TestUtils.renderIntoDocument(
                        <Translation word="testword" url={apiUrls.getUrl("translate")} />
                    );
                });

                afterEach(function(){
                    Translation.prototype.callAjax.restore();
                })

                it('should have proper initial state values', function(){
                    var initialState = component.state;
                    expect(initialState).to.deep.equal({word: '', translation: '', pronunciation: '', error: false, nodata: false});
                });

                it('should have proper initial properties', function(){
                    var props = component.props;
                    expect(props).to.deep.equal({url: '/api/translate', word: 'testword'});
                });

                it("should call appriopriate API endpoint on mount", function(){
                    expect(component.callAjax.calledOnce).to.be.true;
                });

                it("should have proper css classes", function(){
                    expect(React.findDOMNode(component).className).to.equal('translation');
                });

                it('should show the phrase to translate on render', function(){
                    expect($(React.findDOMNode(component))).to.have.text('testword');
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
                        <Translation word="testword" url={apiUrls.getUrl("translate")} />
                    );
                });

                it('should fill in properties after successfull API call', function(){
                    server.respond();
                    expect(component.state.data).to.deep.equal({word: 'testword', translation: 'translation for the testword'});
                });

                it('should show dictionary data after successfull API call', function(){
                    server.respond();
                    expect($(React.findDOMNode(component))).to.have.text('translation for the testword');
                });

                it('should show appriopriate message if no data was returned after successfull API call', function(){
                    server.respondWith("POST", "/api/translate", [
                        200,
                        { "Content-Type": "application/json" },
                        JSON.stringify(false)
                    ]);
                    server.respond();
                    let noData = TestUtils.findRenderedDOMComponentWithClass(component, 'translation').getDOMNode();
                    expect(noData.textContent).equal('No definition found');
                });
            });

            describe('Unsuccessfull API call', function(){
                beforeEach(function(){
                    server.respondWith("POST", "/api/translate", [
                        500,
                        { "Content-Type": "application/json" },
                        ''
                    ]);

                    component = TestUtils.renderIntoDocument(
                        <Translation word="testword" url={apiUrls.getUrl("translate")} />
                    );
                });

                it('should display an error message if API call wass unsuccessfull', function(){
                    server.respond();
                    let error = TestUtils.findRenderedDOMComponentWithClass(component, 'error-text').getDOMNode();
                    expect(error.textContent).equal('Server Error');
                });

                it('should show "try again" button on unsuccessfull API call', function(){
                    server.respond();
                    let error = TestUtils.findRenderedDOMComponentWithClass(component, 'error-button').getDOMNode();
                    expect(error.textContent).equal('Try Again');
                });
            });
        });
    })
});
