define(function(require) {
    'use strict';

    var SessionModel = require('models/session')

    var session = (function(){
        if(App.session instanceof SessionModel.constructor){
            return App.session;
        } else {
            App.session = new SessionModel()
            return App.session;
        }
    })();

    return session;
});
