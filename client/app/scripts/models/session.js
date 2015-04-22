define(function(require){

    var Backbone = require('backbone'),
        ApiUrls = require('urls');
    require('jquery-cookie');

    return Backbone.Model.extend({
        url: ApiUrls.getUrl('authenticated'),
        /**
         * connect.sid - backend (express-session) generated session id
         * passed to the client on user login
         */
        defaults: {
            "connect.sid": null,
            user_id: null
        },

        initialize: function(){
            this.load();
        },

        authenticated: function(){
            //check on backend if cookie (connect.sid) matches session id
            //and return true or false ?
            return !!this.get('connect.sid');
        },

        save: function(hash){
            //$.cookie('user_id', hash.id);
            //$.cookie('access_token', hash.token);
        },

        load: function(){
            this.set({
                user_id: $.cookie('user_id'),
                "connect.sid": $.cookie('connect.sid')
            });
        }
    });
});