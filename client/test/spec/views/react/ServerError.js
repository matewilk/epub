'use strict';

define(function (require) {
    'use strict';

    var React = require('react'),
        TestUtils = React.addons.TestUtils,
        ServerError = require('views/react/ServerError');

    describe('React', function () {
        describe('Server Error', function () {
            var component = null;

            it('should show "Server Error" message on render', function () {
                component = TestUtils.renderIntoDocument(React.createElement(ServerError, { onClick: function onClick() {} }));
                var textNode = TestUtils.findRenderedDOMComponentWithClass(component, 'error-text').getDOMNode();
                expect(textNode.textContent).equal("Server Error");
            });

            it('should trigger a callback after "Try Again" is clicked', function (done) {
                var callback = function callback(event) {
                    expect(event.target.innerHTML).equals("Try Again");
                    done();
                };
                component = TestUtils.renderIntoDocument(React.createElement(ServerError, { onClick: callback }));
                var button = TestUtils.findRenderedDOMComponentWithClass(component, 'error-button').getDOMNode();
                TestUtils.Simulate.click(button);
            });
        });
    });
});
