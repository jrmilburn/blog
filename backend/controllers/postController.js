const { prisma } = require("../config/passport");

async function getPosts(req, res) {

    const posts = await prisma.post.findMany();

    if(posts.length > 0){
        return res.json({
            posts
        });
    }

    return res.json("No posts found");

}

async function getPost(req, res) {

    const postId = req.params.postid;

    const post = await prisma.post.findUnique({
        id: postId,
    });

    return post;

}

async function createPost(req, res) {

    const post = {
        title: "Hello world",
        content: "Goodbye world!",
        author: req.user,

    }

}

async function editPost(req, res) {

}

async function deletePost(req, res) {

}

module.exports = {
    getPosts,
    getPost,
    createPost,
    editPost,
    deletePost
}