define(function(require){
    'use strict';

    let React = require('react'),
        classNames = require('classnames'),
        DictionaryCall = require('views/react/DictionaryCall');

    return React.createClass({
        displayName: 'AccordionContent',
        getInitialState: function(){
            return {
                loaded: false
            }
        },
        componentWillReceiveProps: function(nextProps){
            var self = this;
            setTimeout(() => {
                this.setState({loaded: nextProps.open});
            },1500);
        },
        render: function(){
            var classes = {
                'accordion-open': this.props.open
            }
            return (
                <div className={classNames("panel-body", classes)}>
                    <DictionaryCall load={this.props.open} url={this.props.url} word={this.props.word}/>
                </div>
            );
        }
    });
});
