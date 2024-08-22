const { prisma } = require("../config/passport");

async function getPosts(req, res) {

    const posts = await prisma.post.findMany({
        include: {
            author: true,   
        }
    });

    console.log(posts);

    if(posts.length > 0){
        return res.json({
            posts
        });
    }

    return res.json("No posts found");

}

async function getPost(req, res) {

    const postId = req.params.postid;

    const post = await prisma.post.findFirst({
        where: {
            id: postId
        },
    });

    return res.json({
        post
    });

}

async function createPost(req, res) {

    //const authorId = req.user.id;

    const post = await prisma.post.create({
        data: {
            title: req.body.title,
            content: req.body.content,
            author: {
                connect: { id: req.body.authorId },
            }
        }
    });

    res.status(201).json(post);

}

async function editPost(req, res) {

    const postId = req.params.postid;
    const { title, content, published } = req.body;

    const updatePost = await prisma.post.update({
        where: {
            id: postId,
        },
        data: {
            title: title,
            content: content,
            published: published
        }
    });

    return res.status(200).json(updatePost);

}

async function deletePost(req, res) {

    const postId = req.params.postid;

    const deletePost = await prisma.post.delete({
        where: {
            id: postId,
        }
    })

}

module.exports = {
    getPosts,
    getPost,
    createPost,
    editPost,
    deletePost
}