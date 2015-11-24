define(function(require){
    'use strict';

    var React = require('react');

    return React.createClass({
        /**
        *
        * Add a spinner to the component on click ?
        *
        **/
        render: function(){
            return (
                React.createElement("div", {className: "error"}, 
                    React.createElement("span", null, "Server Error"), 
                    React.createElement("p", null, React.createElement("a", {onClick: this.props.onClick}, "Try Again"))
                )
            )
        }
    });
});
