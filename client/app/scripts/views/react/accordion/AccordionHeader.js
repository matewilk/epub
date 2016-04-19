'use strict';

define(function (require) {
    'use strict';

    var React = require('react'),
        classNames = require('classnames');

    return AccordionHeader = React.createClass({
        displayName: 'AccordionHeader',

        handleClick: function handleClick(event) {
            var customEvent = new CustomEvent('click-accordion-header', {
                detail: { tab: this.props.tabNo },
                bubbles: true
            });
            event.target.dispatchEvent(customEvent);
        },
        render: function render() {
            var classes = {
                'accordion-active': this.props.active
            };
            return React.createElement(
                'div',
                { className: classNames("panel-heading", classes), onClick: this.handleClick },
                this.props.title
            );
        }
    });
});
