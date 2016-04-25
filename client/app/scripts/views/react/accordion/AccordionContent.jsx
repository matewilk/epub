define(function(require){
    'use strict';

    let React = require('react'),
        classNames = require('classnames'),
        DictionaryCall = require('views/react/DictionaryCall'),
        Loader = require('react-loader');

    return React.createClass({
        displayName: 'AccordionContent',
        getInitialState: function(){
            return {
                loaded: false
            }
        },
        componentWillReceiveProps: function(nextProps){
            var self = this;
            setTimeout(function(){
                self.setState({loaded: nextProps.open});
            },1500);
        },
        render: function(){
            var classes = {
                'accordion-open': this.props.open
            }
            return (
                <div className={classNames("panel-body", classes)}>
                    <Loader loaded={this.state.loaded}>
                        <DictionaryCall url={this.props.url} word={this.props.word}/>
                    </Loader>
                </div>
            );
        }
    });
});
