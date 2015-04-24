define(function(require){

    var Backbone = require('backbone'),
        ApiUrls = require('urls');
    require('jquery-cookie');

    return Backbone.Model.extend({
        /**
         * variable responsible for checking if some UI components should be displayed
         * (less important components like "Logout (view)" button)
         */
        auth: false,

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
            this.listenTo(this, 'sync', this.update);
            this.load();
        },

        /**
         * Called on model sync to set "auth" variable
         *
         * triggers event for other components to change state eventually
         *
         * @param model
         * @param response
         * @param options
         */
        update: function(model, response, options){
            this.auth = response.authenticated;
            this.trigger('session:change', this.auth);
        },

        /**
         * Call this function to check on less important components if user is authenticated
         * otherwise use "check" function which calls ajax to check auth on server side
         * @returns {boolean}
         */
        authenticated: function(){
            return this.auth;
        },

        /**
         * Sends ajax request for authentication check
         */
        check: function(){
            this.save();
        },

//        save: function(hash){
//            //$.cookie('user_id', hash.id);
//            //$.cookie('access_token', hash.token);
//        },

        load: function(){
            this.set({
                user_id: $.cookie('user_id'),
                "connect.sid": $.cookie('connect.sid')
            });
        }
    });
});