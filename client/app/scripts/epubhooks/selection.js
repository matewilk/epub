define(function(require){
    'use strict';

    var React = require('react'),
        Selection = require('views/react/dictionaryPopUp'),
        Mask = require('views/components/mask'),
        Backbone = require('backbone'),
        selectionHelper = require('helpers/selection');

    require('epubjs');

    EPUBJS.Hooks.register("beforeChapterDisplay").transculsions = function(callback, renderer){
        $(renderer.element).contents().find('body').bind('mouseup', function(){

            var targetDocument = $(renderer.element).contents()[0];
            var selection = selectionHelper.getSelected(targetDocument);

            if(selection){
                var range = $(renderer.element).contents()[0].getSelection().getRangeAt(0).getBoundingClientRect();
                var relative = document.body.parentNode.getBoundingClientRect();

                var mask = new Mask();
                Backbone.listenTo(Backbone, 'mask:hide', function(){
                    selectionHelper.clearSelectedOnSelection(selection);
                });

                //padding to calculate additional space between widow width and epub document
                var padding = ($(window).width() - $(renderer.element).width())/2;
                //added 50px to top as the content is moved 50px because of the header
                //20px for the element to be above the selected word
                var top = (range.bottom - relative.top + 50 - 20)+'px';
                var right = -(range.right - relative.right + padding) + 'px';

                React.render(React.createElement(Selection, {selection: selection.toString(), top: top, right: right}), mask.$el[0]);
            }
        });

        $(renderer.element).contents().find('body').bind('touchend', function(){

            var selection = $(renderer.element).contents()[0].getSelection().toString();
            console.log('mobile: '+selection);
        });
        callback();
    };

});
