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
                <div className='error'>
                    <span>Server Error</span>
                    <p><a onClick={this.props.onClick}>Try Again</a></p>
                </div>
            )
        }
    });
});
