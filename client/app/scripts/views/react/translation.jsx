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
                error: false,
                nodata: false
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
                    if(!data){
                        this.setState({nodata: true});
                    } else {
                        this.setState({data: data});
                    }
                }.bind(this),
                error: function(xhr, status, error){
                    console.log(this.props.url, status, error.toString());
                    this.setState({error: true});
                }.bind(this)
            });
        }

        render(){
            let body,
                error = this.state.error;

            body = this.state.nodata ? <div>No definition found</div> : <div><p>{this.props.word}</p><p>{this.state.data}</p></div>;
            return (
                <div className="translation">
                    {body}
                    {error ? <ServerError onClick={this.callAjax}/> : null}
                </div>
            )
        }
    };
});
