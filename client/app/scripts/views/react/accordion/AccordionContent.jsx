define(function(require){
    'use strict';

    let React = require('react'),
        classNames = require('classnames'),
        Loader = require('react-loader');

    return AccordionContent = React.createClass({
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
                        <p>
                            Lorem Ipsum is simply dummy text
                        </p>
                    </Loader>
                </div>
            );
        }
    });
});
