define(function(require){

    var Backbone = require('backbone');
    require('jquery-cookie');

    return Backbone.Model.extend({
        defaults: {
            access_token: null,
            user_id: null
        },

        initialize: function(){
            this.load();
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