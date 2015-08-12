define(function(require){
    'use strict';

    var React = require('react'),
        Backbone = require('backbone');

    require('backbone-react');

    return React.createClass({
        render: function() {
            return <div>{this.props.selection}</div>;
        }
    });
});