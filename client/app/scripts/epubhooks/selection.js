define(function(require){
    'use strict';

    require('epubjs');

    EPUBJS.Hooks.register("beforeChapterDisplay").transculsions = function(callback, renderer){
        $(renderer.element).contents().find('body').bind('mouseup', function(){

            var selection = $(renderer.element).contents()[0].getSelection().toString();
            console.log(selection);
        });

        $(renderer.element).contents().find('body').bind('touchend', function(){

            var selection = $(renderer.element).contents()[0].getSelection().toString();
            console.log('mobile: '+selection);
        });
        callback();
    };

});
