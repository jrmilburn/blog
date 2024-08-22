const { Router } = require("express");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");
const { passport } = require("../config/passport");

const postRouter = Router({mergeParams: true});

/**Posts */

postRouter.get("/", postController.getPosts);
postRouter.get("/:postid", postController.getPost);

postRouter.post("/", passport.authenticate('jwt', { session: false }), postController.createPost);

postRouter.put("/:postid", passport.authenticate('jwt', { session: false }), postController.editPost);

postRouter.delete("/:postid", passport.authenticate('jwt', { session: false }), postController.deletePost);

/**Comments */

postRouter.get("/:postid/comments", commentController.getComments);

postRouter.post("/:postid/comments", passport.authenticate('jwt', { session: false }), commentController.createComment);

postRouter.put("/:postid/comments/:commentid", commentController.editComment);

postRouter.delete("/:postid/comments/:commentid", commentController.deleteComment);

module.exports = postRouter;