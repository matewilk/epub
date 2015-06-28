var session = {
    'get': function(req, res){
        if(req.session.user){
            //check in db if user exists ?
            //if not, do not authenticate and destroy session ?
            //-------------------------------------------
            //create global app.use(function(req,res, next)
            // which checks for auth in db ???
            // No! -> it's done on a front-end side ?
            // that's why we have this method here
            // INTERESTING! which is better
            res.send({authenticated: true});
        } else {
            res.send({authenticated: false});
        }
    }
};

module.exports = session;
