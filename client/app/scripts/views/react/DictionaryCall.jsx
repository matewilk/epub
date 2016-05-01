define(function(require){
    'use strict';

    var React = require('react'),
        $ = require('jquery'),
        DataTab = require('views/react/DataTab'),
        ServerError = require('views/react/ServerError');

    return class DictionaryCall extends React.Component {

        constructor (props) {
            super();
            this.state = {
                word: '',
                data: [],
                error: false,
                nodata: false,
                initialLoaded: props.load
            }
        }

        componentDidMount () {
            if(this.state.initialLoaded){
                this.callAjax();
            }
        }

        componentWillReceiveProps (nextProps) {
            if(nextProps.load){
                this.setState({initialLoaded: true});
            }
        }

        componentWillUpdate (nextProps, nextState) {
            if(this.state.initialLoaded !== nextState.initialLoaded) {
                this.callAjax();
            }
        }

        callAjax () {
            $.ajax({
                url: this.props.url,
                dataType: 'json',
                catche: false,
                method: 'POST',
                data: {word: this.props.word},
                success: (data) => {
                    if(!data.length){
                        this.setState({nodata: true});
                    } else {
                        this.setState({data: data});
                    }
                },
                error: (xhr, status, error) => {
                    console.log(this.props.url, status, error.toString());
                    this.setState({error: true});
                }
            });
        }

        render () {
            let body,
                error = this.state.error;

            if(this.state.nodata){
                body = <div>No definition found</div>
            } else {
                body = <DataTab data={this.state.data} title={this.props.word}/>
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
