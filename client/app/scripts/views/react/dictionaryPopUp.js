'use strict';

define(function (require) {
    'use strict';

    var React = require('react'),
        Translation = require('views/react/dictionaryCall'),
        apiUrls = require('globals/urls');

    return React.createClass({
        render: function render() {
            var divStyle = {
                top: this.props.top,
                bottom: this.props.bottom,
                right: this.props.padding,
                left: this.props.padding
            };
            var arrow = this.props.indicator.horizontal ? 'top-arrow' : 'bottom-arrow';
            return React.createElement(
                'div',
                { className: 'dictionary-pop-up', style: divStyle },
                React.createElement('div', { className: arrow, style: { left: this.props.indicator.vertical } }),
                React.createElement(Translation, { url: apiUrls.getUrl("translate"), word: this.props.selection })
            );
        }
    });
});
