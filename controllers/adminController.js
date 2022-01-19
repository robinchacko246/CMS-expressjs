const Post = require('../models/PostModel').Post;
const Category = require('../models/CategoryModel').Category;
const Comment = require('../models/CommentModel').Comment;
const {isEmpty} = require('../config/customFunctions');
const { Ourwork } = require('../models/ourWorkModel');


// web
const Services = require('../models/ServicesModel').Service;
const blogModel = require('../models/blogModel').Blog;
const ourWorkModel = require('../models/ourWorkModel').Ourwork;
const PortfolioModel = require('../models/PortfolioModel').Portfolio;
const teamModel = require('../models/teamModel').Team;
const testimonialModel = require('../models/testimonialModel').Test;
module.exports = {

    index: (req, res) => {
        res.render('admin/index');

    },


    /* ADMIN POSTS ENDPOINTS */


    getPosts: (req, res) => {
        Post.find()
            .populate('category')
            .then(posts => {
                res.render('admin/posts/index', {posts: posts});
            });
    },


    getCreatePostPage: (req, res) => {
        Category.find().then(cats => {

            res.render('admin/posts/create', {categories: cats});
        });


    },

    submitCreatePostPage: (req, res) => {

        const commentsAllowed = !!req.body.allowComments;

        // Check for any input file
        let filename = '';

        if (!isEmpty(req.files)) {
            let file = req.files.uploadedFile;
            filename = file.name;
            let uploadDir = './public/uploads/';

            file.mv(uploadDir + filename, (err) => {
                if (err)
                    throw err;
            });
        }

        const newPost = new Post({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            allowComments: commentsAllowed,
            category: req.body.category,
            file: `/uploads/${filename}`
        });

        newPost.save().then(post => {
            req.flash('success-message', 'Post created successfully.');
            res.redirect('/admin/posts');
        });
    },

    getEditPostPage: (req, res) => {
        const id = req.params.id;

        Post.findById(id)
            .then(post => {
                Category.find().then(cats => {
                    res.render('admin/posts/edit', {post: post, categories: cats});
                });
            });
    },

    submitEditPostPage: (req, res) => {
        const commentsAllowed = !!req.body.allowComments;
        const id = req.params.id;
        Post.findById(id)
            .then(post => {
                post.title = req.body.title;
                post.status = req.body.status;
                post.allowComments = commentsAllowed;
                post.description = req.body.description;
                post.category = req.body.category;


                post.save().then(updatePost => {
                    req.flash('success-message', `The Post ${updatePost.title} has been updated.`);
                    res.redirect('/admin/posts');
                });
            });
    },

    deletePost: (req, res) => {

        Post.findByIdAndDelete(req.params.id)
            .then(deletedPost => {
                req.flash('success-message', `The post ${deletedPost.title} has been deleted.`);
                res.redirect('/admin/posts');
            });
    },


    /* ALL CATEGORY METHODS*/
    getCategories: (req, res) => {

        Category.find().then(cats => {
            res.render('admin/category/index', {categories: cats});
        });
    },

    createCategories: (req, res) => {
        let categoryName = req.body.name;

        if (categoryName) {
            const newCategory = new Category({
                title: categoryName
            });

            newCategory.save().then(category => {
                res.status(200).json(category);
            });
        }

    },

    getEditCategoriesPage: async (req, res) => {
        const catId = req.params.id;

        const cats = await Category.find();


        Category.findById(catId).then(cat => {

            res.render('admin/category/edit', {category: cat, categories: cats});

        });
    },


    submitEditCategoriesPage: (req, res) => {
        const catId = req.params.id;
        const newTitle = req.body.name;

        if (newTitle) {
            Category.findById(catId).then(category => {

                category.title = newTitle;

                category.save().then(updated => {
                    res.status(200).json({url: '/admin/category'});
                });

            });
        }
    },

    /* COMMENT ROUTE SECTION*/
    getComments: (req, res) => {
        Comment.find()
            .populate('user')
            .then(comments => {
                res.render('admin/comments/index', {comments: comments});
            })
    },

 /* ALL Services METHODS*/
 getServices: (req, res) => {

    Services.find().then(services => {
        res.render('admin/services/index', {services: services});
    });
},

createServices: (req, res) => {
    
    
    let title = req.body.name||"Test";
    let description = req.body.decription||"Test";
     
    if (title) 
    {
        const newServices = new Services({
            title: title,
            description:description
        });

        
        
        newServices.save().then(services => {
            res.status(200).json(services);
        });
    }

},

getEditServicesPage: async (req, res) => {
    const servicesId = req.params.id;

    const services = await Services.find();

    
    

    Services.findById(servicesId).then(service => {

       
        

        res.render('admin/services/edit', {service: service, services: services});

    });
},


submitEditServicesPage: (req, res) => {
    const catId = req.params.id;
    const newTitle = req.body.name;
    const newDescription=req.body.description;
    if (newTitle) {
        Services.findById(catId).then(services => {

            services.title = newTitle;
            services.description = newDescription;
            services.save().then(updated => {
                res.status(200).json({url: '/admin/services'});
            });

        });
    }
},


//BLOGS

getBlogs: (req, res) => {

    blogModel.find().then(blogs => {
        res.render('admin/blogs/index', {blogs: blogs});
    });
},

createBlogs: (req, res) => {
  // console.log("created",req.user);
    
    
    let blogHead = req.body.name||"Test";
    let blogBy = req.user.firstName+' '+req.user.lastName;
    let blogDetails = req.body.decription||"Test";
    let image = req.body.image||"Test";
    //let blogCreated = req.body.blogCreated||"Test";
     
    if (blogHead) 
    {
        const newServices = new blogModel({
            blogHead: blogHead,
            blogDetails:blogDetails,
            blogBy:blogBy,
            image:image,
            blogCreated:new Date(),
            
        });

        
        
        newServices.save().then(blogs => {
            res.status(200).json(blogs);
        });
    }

},

getEditBlogPage: async (req, res) => {
    const blogId = req.params.id;

    const blogs = await blogModel.find();

    console.log("blogs",blogs);
    
    

    blogModel.findById(blogId).then(blog => {

       
        
        
        res.render('admin/blogs/edit', {blog: blog, blogs: blogs});

    });
},


submitEditBlogPage: (req, res) => {
    const blogId = req.params.id;
    let blogHead = req.body.name||"Test";

    let blogDetails = req.body.description||"Test";
    let image = req.body.image||"Test";

    console.log("re",req.body,req.params);
    
    if (blogId) {
        blogModel.findById(blogId).then(blog => {
            blog.blogHead=blogHead;
            blog.blogDetails=blogDetails;
          
            blog.image=image;
           
            blog.save().then(updated => {
                res.status(200).json({url: '/admin/blogs'});
            });

        });
    }
},


getOurwork: (req, res) => {

    ourWorkModel.find().then(ourwork => {
        res.render('admin/ourwork/index', {ourwork: ourwork});
    });
},

createOurwork: (req, res) => {
    
    
    let title = req.body.name||"Test";
    let description = req.body.decription||"Test";
     
    if (title) 
    {
        const newOurwork = new ourWorkModel({
            title: title,
            description:description
        });

        
        
        newOurwork.save().then(services => {
            res.status(200).json(services);
        });
    }

},

getEditOurworkPage: async (req, res) => {
    const servicesId = req.params.id;

    const services = await ourWorkModel.find();

    
    

    ourWorkModel.findById(servicesId).then(service => {

       
        

        res.render('admin/ourwork/edit', {ourwork: service, ourworks: services});

    });
},


submitEditOurworkPage: (req, res) => {
    const catId = req.params.id;
    const newTitle = req.body.name;
    const newDescription=req.body.description;
    if (newTitle) {
        ourWorkModel.findById(catId).then(services => {

            services.title = newTitle;
            services.description = newDescription;
            services.save().then(updated => {
                res.status(200).json({url: '/admin/ourwork'});
            });

        });
    }
},



// portfiolo
getPortfiolo: (req, res) => {

    PortfolioModel.find().then(ourwork => {
        res.render('admin/portfolio/index', {portfolio: ourwork});
    });
},

createPortfiolo: (req, res) => {
    
    
    let title = req.body.name||"Test";
    let description = req.body.decription||"Test";
     let image=req.body.image||"https://res.cloudinary.com/djl4pepq7/image/upload/v1642414821/netotech/oie_OykdHZcmoydi_1_ga8dax.png"
   
     let link=req.body.link ||"google.com";
     if (title) 
    {
        const newOurwork = new PortfolioModel({
            title: title,
            description:description,
            image:image,
            link:link
        });

        
        
        newOurwork.save().then(services => {
            res.status(200).json(services);
        });
    }

},

getEditPortfioloPage: async (req, res) => {
    const servicesId = req.params.id;

    const services = await PortfolioModel.find();

    
    

    PortfolioModel.findById(servicesId).then(service => {

       
        

        res.render('admin/portfolio/edit', {portfolio: service, portfolios: services});

    });
},


submitEditPortfioloPage: (req, res) => {
    const catId = req.params.id;
    const newTitle = req.body.name;
    const newDescription=req.body.description;
    let image=req.body.image||"https://res.cloudinary.com/djl4pepq7/image/upload/v1642414821/netotech/oie_OykdHZcmoydi_1_ga8dax.png"
   let link=req.body.link ||"google.com";
    if (newTitle) {
        PortfolioModel.findById(catId).then(services => {
             console.log(services);
            services.title = newTitle;
            services.description = newDescription;
            services.image=image;
            services.link=link;
            services.save().then(updated => {
                res.status(200).json({url: '/admin/portfolio'});
            });

        });
    }
},
};


