define(function(require){

    var Backbone = require('backbone');
    require('jquery-cookie');

    return Backbone.Model.extend({
        /**
         * access_token - backend generated session id
         * passed to the client on user login
         */
        defaults: {
            access_token: null,
            user_id: null
        },

        initialize: function(){
            this.load();
        },

        authenticated: function(){
            return !!this.get('access_token');
        },

        save: function(hash){
            //$.cookie('user_id', hash.id);
            //$.cookie('access_token', hash.token);
        },

        load: function(){
            this.set({
                user_id: $.cookie('user_id'),
                access_token: $.cookie('access_token')
            });
        }
    });
});