'use strict';

define(function (require) {
    'use strict';

    var React = require('react'),
        AccordionHeader = require('views/react/accordion/AccordionHeader'),
        AccordionContent = require('views/react/accordion/AccordionContent');

    return React.createClass({
        displayName: 'AccordionContent',
        render: function render() {
            return React.createElement(
                'div',
                { className: 'panel panel-primary' },
                React.createElement(AccordionHeader, { title: this.props.title, tabNo: this.props.tabNo, active: this.props.open }),
                React.createElement(AccordionContent, { open: this.props.open, url: this.props.url, word: this.props.word })
            );
        }
    });
});
