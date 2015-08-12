define(function(require){
    'use strict';

    var React = require('react'),
        Selection = require('views/react/test');

    require('epubjs');

    EPUBJS.Hooks.register("beforeChapterDisplay").transculsions = function(callback, renderer){
        $(renderer.element).contents().find('body').bind('mouseup', function(){

            var selection = $(renderer.element).contents()[0].getSelection().toString();
            var range = $(renderer.element).contents()[0].getSelection().getRangeAt(0).getBoundingClientRect();


            var relative = document.body.parentNode.getBoundingClientRect();
            var element = document.createElement('div');

            document.body.appendChild(element);

            element.className = 'dictionary-pop-up';
            //element.innerHTML = selection;

            //added 50px to top as the content is moved 50px because of the header
            //20px for the element to be above the selected word
            element.style.top =(range.bottom - relative.top + 50 - 20)+'px';

            //added 10% of relative.right - margins on the sides of the book
            element.style.right=-(range.right - relative.right + ((10 / 100)*relative.right))+'px';

            React.render(React.createElement(Selection, {selection: selection}), element);
        });

        $(renderer.element).contents().find('body').bind('touchend', function(){

            var selection = $(renderer.element).contents()[0].getSelection().toString();
            console.log('mobile: '+selection);
        });
        callback();
    };

});
