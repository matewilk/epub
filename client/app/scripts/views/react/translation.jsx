define(function(require){
    'use strict';

    var React = require('react'),
        $ = require('jquery'),
        ServerError = require('views/react/serverError');

    return class Translation extends React.Component {

        constructor(props){
            super();
            this.state = {
                word: '',
                translation: '',
                pronunciation: '',
                error: false
            }
            //this.callAjax = this.callAjax.bind(this);
        }

        componentDidMount(){
            this.callAjax();
        }

        callAjax(){
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
        }

        render(){
            return (
                <div className="translation">
                    {this.props.word}
                    {this.state.data}
                    {this.state.error ? <ServerError onClick={this.callAjax}/> : null}
                </div>
            )
        }
    };
});
