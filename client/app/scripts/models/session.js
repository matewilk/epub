define(function(require){

    var Backbone = require('backbone'),
        ApiUrls = require('globals/urls');
    require('jquery-cookie');

    return Backbone.Model.extend({
        /**
         * auth: false - variable responsible for checking if some UI components should be displayed
         * (less important components like "Logout (view)" button)
         *
         * connect.sid - backend (express-session) generated session id
         * passed to the client on user login
         */
        defaults: {
            //backbone can REST only with model id
            id: 1,
            authenticated: false,
            "connect.sid": null,
            user_id: null
        },

        url: ApiUrls.getUrl('session'),

        initialize: function(){
            this.listenTo(this, 'sync', this.update);
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
        update: function(model, response){
            this.set('authenticated', response.authenticated);
        },

        /**
         * Call this function to check on less important components if user is authenticated
         * otherwise use "check" function which calls ajax to check auth on server side
         * @returns {boolean}
         */
        authenticated: function(){
            return this.get('authenticated');
        },

        /**
         * Sends ajax request for authentication check
         *
         * if successfully authenticated call callback.success function
         * otherwise call callback.error function
         *
         * @param callback
         */
        check: function(callback){
            this.fetch({
                success: function(model, response){
                    if(response.authenticated){
                        if('success' in callback) callback.success(model, response);
                    } else {
                        if('error' in callback) callback.error(model, response);
                    }
                },
                error: function(model, response){
                    if('error' in callback) callback.error(model, response.responseJSON[0]);
                }
            });
        }
    });
});