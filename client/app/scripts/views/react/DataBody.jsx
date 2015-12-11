define(function(require){
    'use strict';

    var React = require('react');

    return class DataBody extends React.Component {
        createItem(item, index, list){
            var header;
            if(index == 0 || item.partOfSpeech !== list[index-1].partOfSpeech){
                header = <div>{item.partOfSpeech}</div>
            }
            return (
                <div key={index}>
                    {header}
                    <div>
                        <div><span>{item.partOfSpeech}</span><span>{item.source}</span></div>
                        <div>{item.definition}</div>
                    </div>
                </div>
            )
        }

        render(){
            var items = this.props.definitions.map(this.createItem);
            return (
                <div className="tab-body">{items}</div>
            )
        }
    }
});
