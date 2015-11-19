define(function(require){
    'use strict';

    var React = require('react'),
        Translation = require('views/react/translation'),
        apiUrls = require('globals/urls');

    return React.createClass({
        render: function() {
            var divStyle = {
                top: this.props.top,
                right: this.props.right
            };
            return (
                React.createElement("div", {className: "dictionary-pop-up", style: divStyle}, 
                    this.props.selection, 
                    React.createElement(Translation, {url: apiUrls.getUrl("translate")})
                )
            )
        }
    });
});
