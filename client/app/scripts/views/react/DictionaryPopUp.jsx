define(function(require){
    'use strict';

    var React = require('react'),
        Translation = require('views/react/DictionaryCall'),
        apiUrls = require('globals/urls');

    return React.createClass({
        displayName: 'DictionaryCall',
        render: function() {
            let divStyle = {
                top: this.props.top,
                bottom: this.props.bottom,
                right: this.props.padding,
                left: this.props.padding
            };
            let arrow = this.props.indicator.horizontal ? 'top-arrow' : 'bottom-arrow';
            return(
                <div className="dictionary-pop-up" style={divStyle}>
                    <div className={arrow} style={{left: this.props.indicator.vertical}}/>
                    <Translation url={apiUrls.getUrl("dictionary")} word={this.props.selection}/>
                </div>
            )
        }
    });
});
