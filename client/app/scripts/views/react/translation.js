define(function(require){
    'use strict';

    var React = require('react'),
        $ = require('jquery'),
        ServerError = require('views/react/ServerError');

    return React.createClass({
        getInitialState: function(){
            return {
                word: '',
                translation: '',
                pronunciation: '',
                error: false
            }
        },

        componentDidMount: function(){
            this.callAjax();
        },

        callAjax: function(){
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                catche: false,
                method: 'POST',
                data: {word: this.props.word},
                success: function(data){
                    this.setState({data: data});
                }.bind(this),
                error: function(xhr, status, error){
                    console.log(this.props.url, status, error.toString());
                    this.setState({error: true});
                }.bind(this)
            });
        },

        render: function(){
            return (
                React.createElement("div", {className: "translation"}, 
                    this.props.word, 
                    this.state.data, 
                    this.state.error ? React.createElement(ServerError, {onClick: this.callAjax}) : null
                )
            )
        }
    });
});
