define(function(require){
    'use strict';

    var React = require('react'),
        DictionaryPopUp = require('views/react/dictionaryPopUp'),
        Mask = require('views/components/mask'),
        Backbone = require('backbone'),
        selectionHelper = require('helpers/selection');

    require('epubjs');

    var instantiateDictionaryPopUp = function(renderer){
        var targetDocument = $(renderer.element).contents()[0];
        var selection = selectionHelper.getSelected(targetDocument);

        if(selection){
            var range = $(renderer.element).contents()[0].getSelection().getRangeAt(0).getBoundingClientRect();
            var relative = document.body.parentNode.getBoundingClientRect();

            var mask = new Mask();
            Backbone.listenTo(Backbone, 'mask:hide', function(){
                selectionHelper.clearSelectedOnSelection(selection);
            });
            //calculate if pop-up should be shown on top or bottom
            var extendToBottom = ($(renderer.element).height() / 2) - ((range.top + range.bottom) / 2) > 0;
            //padding to calculate additional space between widow width and epub document
            var padding = ($(window).width() - $(renderer.element).width())/2;

            var top, bottom;
            if(extendToBottom){
                //added 50px to top as the content is moved 50px because of the header
                //25px for the element to be above/below the selected word
                top = (range.bottom - relative.top + 50 + 25)+'px';
                bottom = 0;
            } else {
                top = 50+'px';
                bottom = $(renderer.element).height() - range.bottom + 50 + 35 +'px';
            }
            //indicator position - right edge of the selected phrase - relative to the body
            var right = -(range.right - relative.right + padding) + 'px';
            //indicator position relative to the edge of the epub iframe
            var indicator = range.right;
            //indicatior position in the middle of the selected phrase
            var indicator = indicator - range.width/2 - 10 + 'px';

            React.render(React.createElement(
                DictionaryPopUp,
                {
                    selection: selection.toString(),
                    padding: padding,
                    bottom: bottom,
                    top: top,
                    indicator: {
                        vertical: indicator,
                        horizontal: extendToBottom
                    },
                    extendToBottom: extendToBottom
                }
            ), mask.$el[0]);
        }
    }

    EPUBJS.Hooks.register("beforeChapterDisplay").transculsions = function(callback, renderer){
        $(renderer.element).contents().find('body').bind('mouseup', function(){
            instantiateDictionaryPopUp(renderer);
        });

        $(renderer.element).contents().find('body').bind('touchend', function(){
            instantiateDictionaryPopUp(renderer);
        });

        callback();
    };

});
