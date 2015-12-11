'use strict';

define(function (require) {
    'use strict';

    var React = require('react'),
        DictionaryCall = require('views/react/DictionaryCall'),
        apiUrls = require('globals/urls');

    return React.createClass({
        displayName: 'DictionaryPopUp',
        render: function render() {
            var divSize = {
                top: this.props.top,
                bottom: this.props.bottom,
                right: this.props.padding,
                left: this.props.padding
            };
            var arrow = this.props.indicator.horizontal ? 'top-arrow' : 'bottom-arrow',
                headerStyles = { right: this.props.padding, left: this.props.padding };

            return React.createElement(
                'div',
                { className: 'dictionary-pop-up', style: divSize },
                React.createElement('div', { className: arrow, style: { left: this.props.indicator.vertical } }),
                React.createElement(DictionaryCall, { url: apiUrls.getUrl("dictionary"), word: this.props.selection, headerStyles: headerStyles })
            );
        }
    });
});
