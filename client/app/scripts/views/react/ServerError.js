'use strict';

define(function (require) {
    'use strict';

    var React = require('react');

    return React.createClass({
        /**
        *
        * Add a spinner to the component on click ?
        *
        **/
        render: function render() {
            return React.createElement(
                'div',
                { className: 'server-error' },
                React.createElement(
                    'span',
                    { className: 'error-text' },
                    'Server Error'
                ),
                React.createElement(
                    'p',
                    null,
                    React.createElement(
                        'a',
                        { className: 'error-button', onClick: this.props.onClick },
                        'Try Again'
                    )
                )
            );
        }
    });
});
