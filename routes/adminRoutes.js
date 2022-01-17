const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const { isUserAuthenticated } = require("../config/customFunctions");

router.all("/*", isUserAuthenticated, (req, res, next) => {
  req.app.locals.layout = "admin";

  next();
});

/* DEFAULT ADMIN INDEX ROUTE*/

router.route("/").get(adminController.index);

/* VARIOUS ADMIN POST ENDPOINTS */

router.route("/posts").get(adminController.getPosts);

router
  .route("/posts/create")
  .get(adminController.getCreatePostPage)
  .post(adminController.submitCreatePostPage);

router
  .route("/posts/edit/:id")
  .get(adminController.getEditPostPage)
  .put(adminController.submitEditPostPage);

router.route("/posts/delete/:id").delete(adminController.deletePost);

/* ADMIN CATEGORY ROUTES*/

router.route("/category").get(adminController.getCategories);



router.route("/category/create").post(adminController.createCategories);

router
  .route("/category/edit/:id")
  .get(adminController.getEditCategoriesPage)
  .post(adminController.submitEditCategoriesPage);

/* ADMIN COMMENT ROUTES */
router.route("/comment").get(adminController.getComments);



//web

/* admin servicer */

router.route("/services").get(adminController.getServices);
router.route("/services/create").post(adminController.createServices);
router
  .route("/services/edit/:id")
  .get(adminController.getEditServicesPage)
  .post(adminController.submitEditServicesPage);


  //BLOGS

  router.route("/blogs").get(adminController.getBlogs);
router.route("/blogs/create").post(adminController.createBlogs);
router
  .route("/blogs/edit/:id")
  .get(adminController.getEditBlogPage)
  .post(adminController.submitEditBlogPage);



  /* admin our work */

router.route("/ourwork").get(adminController.getOurwork);
router.route("/ourwork/create").post(adminController.createOurwork);
router
  .route("/ourwork/edit/:id")
  .get(adminController.getEditOurworkPage)
  .post(adminController.submitEditOurworkPage);



  //portfolio create
  
  router.route("/portfolio").get(adminController.getPortfiolo);
router.route("/portfolio/create").post(adminController.createPortfiolo);
router
  .route("/portfolio/edit/:id")
  .get(adminController.getEditPortfioloPage)
  .post(adminController.submitEditPortfioloPage);


module.exports = router;
