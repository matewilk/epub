define(function(require){
    'use strict';

    var React = require('react'),
        TestUtils = React.addons.TestUtils,
        ServerError = require('views/react/ServerError');

    describe('React', function(){
        describe('Server Error', function(){
            let component = null;

            it('should show "Server Error" message on render', function(){
                component = TestUtils.renderIntoDocument(
                    <ServerError onClick={function(){}}/>
                );
                let textNode = TestUtils.findRenderedDOMComponentWithClass(component, 'error-text').getDOMNode();
                expect(textNode.textContent).equal("Server Error");
            })

            it('should trigger a callback after "Try Again" is clicked', function(done){
                let callback = function(event){
                    expect(event.target.innerHTML).equals("Try Again")
                    done();
                };
                component = TestUtils.renderIntoDocument(
                    <ServerError onClick={callback}/>
                );
                let button = TestUtils.findRenderedDOMComponentWithClass(component, 'error-button').getDOMNode();
                TestUtils.Simulate.click(button);
            });
        });
    });
});
