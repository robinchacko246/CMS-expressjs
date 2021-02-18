const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const Comment = require('../models/CommentModel').Comment;
const bcrypt = require('bcryptjs');
const User = require('../models/UserModel').User;
// web
const Services = require('../models/ServicesModel').Service;
const blogModel = require('../models/blogModel').Blog;
const ourWorkModel = require('../models/ourWorkModel').Ourwork;
const PortfolioModel = require('../models/PortfolioModel').Portfolio;
const teamModel = require('../models/teamModel').Team;
const testimonialModel = require('../models/testimonialModel').Test;
var nodemailer = require('nodemailer');

module.exports = {

    index: async (req, res) => {

        const services = await Services.find();
        const categories = await Services.find();
        const Portfolio = await PortfolioModel.find();
        const blog = await blogModel.find();
        const About = await Category.find();
        const OurWork = await ourWorkModel.find();
        const Team = await teamModel.find();
        const Testimonials=await testimonialModel.find();
        res.render('default/index', {Team:Team,Testimonials:Testimonials,services: services, categories: categories,Portfolio:Portfolio,blog:blog,About:About,OurWork:OurWork});
    },

    /* LOGIN ROUTES */
    loginGet: (req, res) => {
        res.render('default/login', {message: req.flash('error')});
    },


    loginPost: (req, res) => {

    },

    /* REGISTER ROUTES*/

    registerGet: (req, res) => {
        res.render('default/register');
    },
    registerPostEmail: (req, res) => {
        let errors = [];

        if (!req.body.firstName) {
            errors.push({message: 'First name is mandatory'});
        }
        if (!req.body.lastName) {
            errors.push({message: 'Last name is mandatory'});
        }
        if (!req.body.email) {
            errors.push({message: 'Email field is mandatory'});
        }
        if (!req.body.password || !req.body.passwordConfirm) {
            errors.push({message: 'Password field is mandatory'});
        }
        if (req.body.password !== req.body.passwordConfirm) {
            errors.push({message: 'Passwords do not match'});
        }

        if (errors.length > 0) {
            res.render('default/register', {
                errors: errors,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
        } else {
            
            
            
            User.findOne({email: req.body.email}).then(user => {
                if (user) {
                    console.log("user",user);
                    
                    req.flash('success-message', 'You are now logined');
                    res.redirect('/');
                     
                    //return done(null, user, req.flash('success-message', 'Login Successful'));
                                //res.redirect('/');
                } else {
                    console.log("no error");
                    const newUser = new User(req.body);
                    
                    bcrypt.genSalt(10, (err, salt) => {
                        
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;
                            newUser.save().then(user => {
                               
                                req.flash('success-message', 'You are now registered');
                                res.redirect('/');
                            });
                        });
                    });
                }
            });
        }
    },
    registerPost: (req, res) => {
        let errors = [];

        if (!req.body.firstName) {
            errors.push({message: 'First name is mandatory'});
        }
        if (!req.body.lastName) {
            errors.push({message: 'Last name is mandatory'});
        }
        if (!req.body.email) {
            errors.push({message: 'Email field is mandatory'});
        }
        if (!req.body.password || !req.body.passwordConfirm) {
            errors.push({message: 'Password field is mandatory'});
        }
        if (req.body.password !== req.body.passwordConfirm) {
            errors.push({message: 'Passwords do not match'});
        }

        if (errors.length > 0) {
            res.render('default/register', {
                errors: errors,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email
            });
        } else {
            
            
            
            User.findOne({email: req.body.email}).then(user => {
                if (user) {
                    
                    req.flash('error-message', 'Email already exists, try to login.');
                    res.redirect('/login');
                } else {
                    console.log("no error");
                    const newUser = new User(req.body);
                    
                    bcrypt.genSalt(10, (err, salt) => {
                        
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            newUser.password = hash;
                            newUser.save().then(user => {
                               
                                req.flash('success-message', 'You are now registered');
                                res.redirect('/');
                            });
                        });
                    });
                }
            });
        }
    },
    mailToAdmin:(req,res)=>
    {
        //
// create reusable transporter object using the default SMTP transport
     const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'myshopyfyklm@gmail.com',   //https://myaccount.google.com/lesssecureapps? goto this link and toggle on else it will block your mail
            pass: '5448lord',
         },
    secure: true,
    });

    const mailData = {
        from: 'robinchacko246@gmail.com',  // sender address
          to: req.body.email,   // list of receivers
          subject: 'Enquery',
          text: req.body.msg ,
          html: `<b>Hey there! </b>
                 <br> There is an enquery from `+req.body.name+`<br/><p>`+req.body.msg+`</p>`
        };
        transporter.sendMail(mailData, function (err, info) {
            if(err)
              console.log(err)
            else
              console.log(info);
         });

    },
    getServices: (req, res) => {
        Services.find()
        // .populate('category')
        .then(service => {
            if (!service) {
                        res.status(404).json({message: 'No Services Found'});
                    }
                    else {
                        console.log("post",service);
                        
                        res.render('default/singlePost', {service: service});
                    }
           // res.render('admin/posts/index', {posts: posts});
        });
        // Services.find({}, function(err, service) {
        //     var serviceMap = {};
        
        //     users.forEach(function(service) {
        //         serviceMap[service._id] = service;
        //     });
        
        //     if (!post) {
        //         res.status(404).json({message: 'No Post Found'});
        //     }
        //     else {
        //         res.render('default/singlePost', {post: post, comments: post.comments});
        //     } 
        //   });
        // const id = req.params.id;
        // Post.find()
        // .populate('category')
        // .then(posts => {
        //     res.render('default/singlePost', {post: post, comments: post.comments});

        //     //res.render('admin/posts/index', {posts: posts});
        // });
        // Post.find()
        //     .populate({path: 'comments', populate: {path: 'user', model: 'user'}})
        //     .then(post => {
        //     if (!post) {
        //         res.status(404).json({message: 'No Post Found'});
        //     }
        //     else {
        //         res.render('default/singlePost', {post: post, comments: post.comments});
        //     }
        // })
    },
    getSinglePost: (req, res) => {
        const id = req.params.id;

        Post.findById(id)
            .populate({path: 'comments', populate: {path: 'user', model: 'user'}})
            .then(post => {
            if (!post) {
                res.status(404).json({message: 'No Post Found'});
            }
            else {
                res.render('default/singlePost', {post: post, comments: post.comments});
            }
        })
    },

    submitComment: (req, res) => {

        if (req.user) {
            Post.findById(req.body.id).then(post => {
                const newComment = new Comment({
                    user: req.user.id,
                    body: req.body.comment_body
                });

                post.comments.push(newComment);
                post.save().then(savedPost => {
                    newComment.save().then(savedComment => {
                      req.flash('success-message', 'Your comment was submitted for review.');
                      res.redirect(`/post/${post._id}`);
                    });
                });


            })
        }

        else {
            req.flash('error-message', 'Login first to comment');
            res.redirect('/login');
        }

    }

};

