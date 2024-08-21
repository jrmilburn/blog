const { Router } = require("express");
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

const postRouter = Router();

/**Posts */

postRouter.get("/", postController.getPosts);
postRouter.get("/:postid", postController.getPost);

postRouter.post("/", postController.createPost);

postRouter.put("/:postid", postController.editPost);

postRouter.delete("/:postid", postController.deletePost);

/**Comments */

postRouter.get("/:postid/comments", commentController.getComments);

postRouter.post("/:postid/comments", commentController.createComment);

postRouter.put("/:postid/comments/:commentid", commentController.updateComment);

postRouter.delete("/:postid/comments/:commentid", commentController.deleteComment);

module.exports = postRouter;