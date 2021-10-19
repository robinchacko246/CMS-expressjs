module.exports = {
    mongoDbUrl : 'mongodb+srv://robinchacko246:5448lord@cluster0.onf03.mongodb.net/myFirstDatabase?retryWrites=true&w=majority/netotech',

    PORT: process.env.PORT || 3000,
    globalVariables: (req, res, next) => {
        res.locals.success_message = req.flash('success-message');
        res.locals.error_message = req.flash('error-message');
        res.locals.user = req.user || null;
        next();
    },


};
