'use strict';

define(function (require) {
    'use strict';

    var React = require('react'),
        TestUtils = React.addons.TestUtils,
        PopUp = require('views/react/DictionaryPopUp'),
        DictionaryCall = require('views/react/DictionaryCall');

    describe('React', function () {
        describe('Dictionary PopUp', function () {
            var component = null;
            beforeEach(function () {
                sinon.stub(DictionaryCall.prototype, 'callAjax');
                component = TestUtils.renderIntoDocument(React.createElement(PopUp, {
                    selection: 'testword', padding: '352px',
                    top: '160px', bottom: '0',
                    indicator: { vertical: "373px", horizontal: true }
                }));
            });

            afterEach(function () {
                DictionaryCall.prototype.callAjax.restore();
            });

            it('should have a proper css class name', function () {
                expect(React.findDOMNode(component).className).to.equal('dictionary-pop-up');
            });

            it('should be positioned properly based on props', function () {
                expect(React.findDOMNode(component).style.top).to.equal('160px');
                expect(React.findDOMNode(component).style.bottom).to.equal('0px');
                expect(React.findDOMNode(component).style.left).to.equal('352px');
                expect(React.findDOMNode(component).style.right).to.equal('352px');
            });

            it('should position arrow (indicatior) based on "indicator" props object', function () {
                expect(React.findDOMNode(component).firstChild.className).to.equal('top-arrow');
                expect(React.findDOMNode(component).firstChild.style.left).to.equal('373px');

                component = TestUtils.renderIntoDocument(React.createElement(PopUp, {
                    selection: 'testword', padding: '352px',
                    top: '160px', bottom: '0',
                    indicator: { vertical: "373px", horizontal: false }
                }));

                expect(React.findDOMNode(component).firstChild.className).to.equal('bottom-arrow');
            });

            it('should pass props to DictionaryCall component', function () {
                expect($(React.findDOMNode(component)).find('.translation')).to.have.text('testword');
                var tmpComponent = component.render();
                var dictionaryCallProps = tmpComponent.props.children[1].props;
                expect(dictionaryCallProps).to.deep.equal({ url: "/api/dictionary", word: "testword" });
            });
        });
    });
});
