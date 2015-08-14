define(function(require){
    'use strict';

    var React = require('react'),
        Selection = require('views/react/dictionaryPopUp');

    require('epubjs');

    EPUBJS.Hooks.register("beforeChapterDisplay").transculsions = function(callback, renderer){
        $(renderer.element).contents().find('body').bind('mouseup', function(){

            var selection = $(renderer.element).contents()[0].getSelection().toString();

            var range = $(renderer.element).contents()[0].getSelection().getRangeAt(0).getBoundingClientRect();
            var relative = document.body.parentNode.getBoundingClientRect();

            var element = document.createElement('div');
            document.body.appendChild(element);

            //added 50px to top as the content is moved 50px because of the header
            //20px for the element to be above the selected word
            var top = (range.bottom - relative.top + 50 - 20)+'px';
            //added 10% of relative.right - margins on the sides of the book
            var right = -(range.right - relative.right + ((10 / 100)*relative.right))+'px';

            React.render(React.createElement(Selection, {selection: selection, top: top, right: right}), element);
        });

        $(renderer.element).contents().find('body').bind('touchend', function(){

            var selection = $(renderer.element).contents()[0].getSelection().toString();
            console.log('mobile: '+selection);
        });
        callback();
    };

});
