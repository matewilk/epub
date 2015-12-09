define(function(require){
    'use strict';

    var React = require('react');

    return class DataBody extends React.Component {
        render(){
            var items = this.props.definitions.map(function(item, index){
                return (
                    <div key={index}>
                        <div><span>{item.partOfSpeech}</span><span>{item.source}</span></div>
                        <div>{item.definition}</div>
                    </div>
                )
            });
            return (
                <div>{items}</div>
            )
        }
    }
});
