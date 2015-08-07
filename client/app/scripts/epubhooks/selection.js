define(function(require){
    'use strict';

    require('epubjs');

    EPUBJS.Hooks.register("beforeChapterDisplay").transculsions = function(callback, renderer){
        $(renderer.element).contents().find('body').bind('mouseup', function(){

            var selection = $(renderer.element).contents()[0].getSelection().toString();
            var range = $(renderer.element).contents()[0].getSelection().getRangeAt(0).getBoundingClientRect();


            var relative = document.body.parentNode.getBoundingClientRect();
            var element = document.createElement('div');

            document.body.appendChild(element);

            element.style.width = '50px';
            element.style.height = '50px';
            element.style.backgroundColor = 'red';
            element.style.position = 'absolute';

            element.style.top =(range.bottom - relative.top)+'px';
            element.style.right=-(range.right - relative.right + ((10 / 100)*relative.right))+'px';

            console.log(selection);
        });

        $(renderer.element).contents().find('body').bind('touchend', function(){

            var selection = $(renderer.element).contents()[0].getSelection().toString();
            console.log('mobile: '+selection);
        });
        callback();
    };

});
