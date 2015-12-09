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
                <div className='server-error'>
                    <span className="error-text">Server Error</span>
                    <p><a className="error-button" onClick={this.props.onClick}>Try Again</a></p>
                </div>
            )
        }
    });
});
