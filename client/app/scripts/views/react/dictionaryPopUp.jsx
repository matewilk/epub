define(function(require){
    'use strict';

    var React = require('react');

    require('backbone-react');

    return React.createClass({
        render: function() {
            var divStyle = {
                top: this.props.top,
                right: this.props.right
            };
            return (
                <div className="dictionary-pop-up" style={divStyle}>{this.props.selection}</div>
            )
        }
    });
});
