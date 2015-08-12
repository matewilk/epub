define(function(require){
    'use strict';

    var React = require('react'),
        Backbone = require('backbone');

    require('backbone-react');

    return React.createClass({
        render: function() {
            return React.createElement("div", null, this.props.selection);
        }
    });
});