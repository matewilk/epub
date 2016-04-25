define(function(require){
    'use strict';

    var React = require('react'),
        Accordion = require('views/react/accordion/Accordion');

    return React.createClass({
        displayName: 'DictionaryPopUp',
        render: function() {
            let divSize = {
                top: this.props.top,
                bottom: this.props.bottom,
                right: this.props.padding,
                left: this.props.padding
            };
            let arrow = this.props.indicator.horizontal ? 'top-arrow' : 'bottom-arrow',
                headerStyles = { right: this.props.padding, left: this.props.padding };

            return(
                <div className="dictionary-pop-up" style={divSize}>
                    <div className={arrow} style={{left: this.props.indicator.vertical}}/>
                    <Accordion word={this.props.selection} />
                </div>
            )
        }
    });
});
