define(function(require){

    var React = require('react'),
        $ = require('jquery');

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
                <div className="translation">
                    {this.props.word}
                    {this.state.data}
                    {this.state.error ? <div>Server Error</div> : null}
                </div>
            )
        }
    });
});
