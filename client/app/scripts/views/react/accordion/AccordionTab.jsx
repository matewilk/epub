define(function(require){
    'use strict';

    let React = require('react'),
        AccordionHeader = require('views/react/accordion/AccordionHeader'),
        AccordionContent = require('views/react/accordion/AccordionContent');

    return React.createClass({
        displayName: 'AccordionContent',
        render: function(){
            return (
                <div className="panel panel-primary">
                    <AccordionHeader title={this.props.title} tabNo={this.props.tabNo} active={this.props.open}/>
                    <AccordionContent open={this.props.open} url={this.props.url} word={this.props.word}/>
                </div>
            );
        }
    });
});
