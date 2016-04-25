'use strict';

define(function (require) {
    'use strict';

    var React = require('react'),
        apiUrls = require('globals/urls'),
        AccordionTab = require('views/react/accordion/AccordionTab');

    return React.createClass({
        displayName: 'Accordion',
        getInitialState: function getInitialState() {
            return {
                activeTab: 1,
                tabs: [{ tabNo: 1, open: true, title: 'Dictionary' }, { tabNo: 2, open: false, title: 'Translator' }, { tabNo: 3, open: false, title: 'Wiki' }]
            };
        },
        componentWillMount: function componentWillMount() {
            window.addEventListener("click-accordion-header", this.openAccordionTab, false);
        },
        componentWillUnmount: function componentWillUnmount() {
            window.removeEventListener("click-accordion-header", this.openAccordionTab, false);
        },
        openAccordionTab: function openAccordionTab(event) {
            this.setState({ activeTab: event.detail.tab });
        },
        getTabs: function getTabs() {
            return this.state.tabs.map(function (tab, index) {
                return React.createElement(AccordionTab, {
                    word: this.props.word,
                    key: tab.tabNo,
                    tabNo: tab.tabNo,
                    open: tab.tabNo === this.state.activeTab,
                    url: apiUrls.getUrl("dictionary"),
                    title: tab.title });
            }.bind(this));
        },
        render: function render() {
            return React.createElement(
                'div',
                null,
                this.getTabs()
            );
        }
    });
});
