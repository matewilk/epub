define(function(require) {
    'use strict';

    var apiPrefix = 'http://localhost:3000/';

    var ApiUrls = (function(){
        var urls = {
            library:  function() {
                return 'library';
            },
            book: function(id) {
                return 'book/'+ id;
            }
        };

        var getUrl = function(type) {
            return urls[type] ? apiPrefix + urls[type].apply(this, [].slice.call(arguments, 1)) : undefined;
        };

        return {
            getUrl: getUrl
        }
    })();

    return ApiUrls;
});
