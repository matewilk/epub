define(function(require){
    'use strict';

    //necessary for unit testing
    require("velocity");

    return (function(){
        var dialogShow = function(element, height){
            element.css({top: -height})
            .removeClass('invisible')
            .velocity({top: 10}, 390, [500, 20]);
        };

        var dialogHide = function(element, height, callback){
            element.velocity({top: -height}, 400, [500, 20], function(){
                element.addClass('invisible');
                if(callback) callback();
            });
        };

        return {
            dialogShow: dialogShow,
            dialogHide: dialogHide
        }
    })();
});
