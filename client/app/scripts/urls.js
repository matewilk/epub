define(function() {
    'use strict';

    var ApiUrls = (function(){
        var urls = {
            library:  function() {
                return 'api/library';
            },
            book: function(id) {
                return 'api/book/'+ id;
            },
            registration: function() {
                return 'api/registration';
            },
            login: function() {
                return 'api/login';
            },
            logout: function() {
                return 'api/logout';
            },
            authenticated: function() {
                return 'api/session/authenticated';
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
