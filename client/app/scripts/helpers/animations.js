define(function(){
    'use strict';

    return (function(){
        var dialogShow = function(element, height){
            element.css({top: -height})
            .removeClass('invisible')
            .velocity({top: 10}, 390, [500, 20]);
        };

        var dialogHide = function(element, height, view){
            element.velocity({top: -height}, 400, [500, 20], function(){
                element.addClass('invisible');
                view.remove();
            });
        };

        return {
            dialogShow: dialogShow,
            dialogHide: dialogHide
        }
    })();
});
