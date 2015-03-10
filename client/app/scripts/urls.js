define(function() {
    'use strict';

    var ApiUrls = (function(){
        var urls = {
            library:  function() {
                return 'library';
            },
            book: function(id) {
                return 'book/'+ id;
            },
            registration: function() {
                return 'registration';
            },
            login: function() {
                return 'login';
            }
        };

        var getUrl = function(type) {
            return urls[type] ? urls[type].apply(this, [].slice.call(arguments, 1)) : undefined;
        };

        return {
            getUrl: getUrl
        };
    })();

    return ApiUrls;
});
