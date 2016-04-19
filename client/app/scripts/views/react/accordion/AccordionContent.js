'use strict';

define(function (require) {
    'use strict';

    var React = require('react'),
        classNames = require('classnames'),
        Loader = require('react-loader');

    return AccordionContent = React.createClass({
        displayName: 'AccordionContent',

        getInitialState: function getInitialState() {
            return {
                loaded: false
            };
        },
        componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
            var self = this;
            setTimeout(function () {
                self.setState({ loaded: nextProps.open });
            }, 1500);
        },
        render: function render() {
            var classes = {
                'accordion-open': this.props.open
            };
            return React.createElement(
                'div',
                { className: classNames("panel-body", classes) },
                React.createElement(
                    Loader,
                    { loaded: this.state.loaded },
                    React.createElement(
                        'p',
                        null,
                        'Lorem Ipsum is simply dummy text'
                    )
                )
            );
        }
    });
});
