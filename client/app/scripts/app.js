define([
    'backbone',
    'views/header',
    'views/login',
    'views/library',
    'views/footer',
    'models/book'
], function(Backbone, Header, Login, Library, Footer){
    'use strict';

    /**
     * TODO write tests for Router
     */
    var Router = Backbone.Router.extend({

        initialize: function(){
            this.header = new Header();
            this.header.render();

            var footer = new Footer();
            footer.render();

            this.listenTo(Backbone, 'router:go', this.go);
        },

        go: function(route) {
            this.navigate(route, {trigger:true, replace:true})
        },

        routes: {
            'login': 'showLogin',
            'library': 'showLibrary',
            'books/:id': 'showBook'
        },

        showLogin: function() {
            this.showView(new Login());
            this.header.model.set('title', 'Login');
        },

        showLibrary: function() {
            this.showView(new Library());
            this.header.model.set('title', 'Library');
        },

        showView: function(view) {
            if(this.currentView) this.currentView.remove();
            $('.content').html(view.render().$el);
            this.currentView = view;
            return view;
        }

    });

    return Router;
});