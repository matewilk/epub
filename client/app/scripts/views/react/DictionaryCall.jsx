define(function(require){
    'use strict';

    var React = require('react'),
        $ = require('jquery'),
        DataTab = require('views/react/DataTab'),
        ServerError = require('views/react/ServerError');

    return class DictionaryCall extends React.Component {

        constructor(props){
            super();
            this.state = {
                word: '',
                definitions: [],
                pronunciation: '',
                error: false,
                nodata: false
            }
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
                    if(!data.length){
                        this.setState({nodata: true});
                    } else {
                        this.setState({definitions: data});
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

            if(this.state.nodata){
                body = <div>No definition found</div>
            } else {
                body = <DataTab definitions={this.state.definitions} title={this.props.word}/>
            }

            return (
                <div className="dictionary-call">
                    {body}
                    {error ? <ServerError onClick={this.callAjax.bind(this)}/> : null}
                </div>
            )
        }
    };
});
