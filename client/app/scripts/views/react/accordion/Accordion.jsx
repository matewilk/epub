define(function(require){
    'use strict';

    let React = require('react'),
        apiUrls = require('globals/urls'),
        AccordionTab = require('views/react/accordion/AccordionTab');

    return React.createClass({
        displayName: 'Accordion',
        getInitialState:function() {
            return {
                activeTab: 1,
                tabs: [
                    {tabNo: 1, open: true, title: 'Dictionary'},
                    {tabNo: 2, open: false, title: 'Translator'},
                    {tabNo: 3, open: false, title: 'Wiki'}
                ]
            }
        },
        componentWillMount: function(){
            window.addEventListener("click-accordion-header", this.openAccordionTab, false);
        },
        componentWillUnmount: function(){
            window.removeEventListener("click-accordion-header", this.openAccordionTab, false);
        },
        openAccordionTab: function(event){
            this.setState({activeTab: event.detail.tab})
        },
        getTabs: function(){
            return this.state.tabs.map(function(tab, index){
                return <AccordionTab
                            word={this.props.word}
                            key={tab.tabNo}
                            tabNo={tab.tabNo}
                            open={tab.tabNo === this.state.activeTab}
                            url={apiUrls.getUrl("dictionary")}
                        title={tab.title} />
            }.bind(this));
        },
        render: function(){
            return (
                <div>
                    {this.getTabs()}
                </div>
            );
        }
    });
});
