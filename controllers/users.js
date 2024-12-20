const User = require('../models/user.js')

module.exports.renderRegister = (req,res)=>{
    res.render('users/register.ejs')
}

module.exports.register = async(req,res,next)=>{
    try{
        const {email,username,password} = req.body;
        const user = new User({email,username})
        const registeredUser = await User.register(user,password)

        // using req.login() to automatically login the registered user 
        req.login(registeredUser,(err)=>{
            if(err) return next(err)
            req.flash('success','Welcome to CampQuest ')
            res.redirect('/campgrounds')
        })
    } catch(e){
        req.flash('error',e.message)
        res.redirect('/register')
    }
}

module.exports.renderLogin = (req,res)=>{
    res.render('users/login.ejs')
}

module.exports.login = (req,res)=>{
    req.flash('success','Welcome back to CampQuest ')

    // Now we can use res.locals.returnTo to redirect the user after login
    const redirectUrl = res.locals.returnTo || '/campgrounds'
    res.redirect(redirectUrl)
}

module.exports.logout = (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        req.flash('success', 'Goodbye!');
        res.redirect('/campgrounds');
    });
}