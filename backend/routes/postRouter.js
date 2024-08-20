const { Router } = require("express");
const postController = require("../controllers/postController");

const postRouter = Router();

/**Posts */

postRouter.get("/", postController.getPosts);
postRouter.get("/:postid", postController.getPost);

postRouter.post("/", postController.createPost);

postRouter.put("/:postid", postController.editPost);

postRouter.delete("/:postid", postController.deletePost);

/**Comments */

/*postRouter.get("/:postid/comments")

postRouter.post("/:postid/comments")

postRouter.put("/:postid/comments/:commentid");

postRouter.delete("/:postid/comments/:commentid");*/

module.exports = postRouter;