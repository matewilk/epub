define(function(require){
    'use strict';

    let React = require('react'),
        classNames = require('classnames');

    return AccordionHeader = React.createClass({
        handleClick: function(event){
            var customEvent = new CustomEvent('click-accordion-header', {
                detail: {tab: this.props.tabNo},
                bubbles: true
            });
            event.target.dispatchEvent(customEvent);
        },
        render: function(){
            var classes = {
                'accordion-active': this.props.active
            }
            return (
                <div className={classNames("panel-heading", classes)} onClick={this.handleClick}>
                    {this.props.title}
                </div>
            );
        }
    });
});
