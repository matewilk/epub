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
                <div className="dictionary-pop-up" style={divStyle}>
                    <Translation url={apiUrls.getUrl("translate")} word={this.props.selection}/>
                </div>
            )
        }
    });
});
