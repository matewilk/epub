module.exports = (function(){

    var getUser = function(user, callback){
        //var login = app.db.collection('session');
        login.findOne(user, function(err, doc){
            if(err) return err;

            if(doc){

            }
        });
    }

    return {
        getUser: getUser
    }
})();
