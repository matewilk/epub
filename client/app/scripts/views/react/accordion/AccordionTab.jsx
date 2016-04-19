define(function(require){
    'use strict';

    let React = require('react');
        AccordionHeader = require('views/react/accordion/AccordionHeader'),
        AccordionContent = require('views/react/accordion/AccordionContent');

    return AccordionTab = React.createClass({
        render: function(){
            return (
                <div className="panel panel-primary">
                    <AccordionHeader title={this.props.title} tabNo={this.props.tabNo} active={this.props.open}/>
                    <AccordionContent open={this.props.open} />
                </div>
            );
        }
    });
});
