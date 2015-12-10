'use strict';

define(function (require) {
    'use strict';

    var React = require('react'),
        TestUtils = React.addons.TestUtils,
        DataBody = require('views/react/DataBody');

    describe('React', function () {
        describe('DataBody', function () {
            var component = null,
                definitions = [];
            beforeEach(function () {
                definitions = [{ partOfSpeech: 'noun', source: 'very wise dictionary', definition: 'definition one' }, { partOfSpeech: 'noun', source: 'even wiser dictionary', definition: 'definition two' }];
                component = TestUtils.renderIntoDocument(React.createElement(DataBody, { definitions: definitions }));
            });

            it('should render appropriate numer of children', function () {
                expect(React.findDOMNode(component).children.length).to.equal(2);
            });
        });
    });
});
