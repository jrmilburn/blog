const { prisma } = require("../config/passport");

async function getComments(req, res) {

    const comments = await prisma.comment.findMany();

    return res.json({
        comments
    })

}

async function createComment(req, res) {

    const postId = req.params.postid;
    const { content, authorId } = req.body;

    const comment = await prisma.comment.create({
        data: {
            content: content,
            post: {
                connect: {id: postId}
            },
            author: {
                connect: {id: authorId}
            }
        }
    });

    res.status(201).json(comment);

}

async function editComment(req, res) {

    const commentId = req.params.commentid;
    const content = req.body.content;

    const comment = await prisma.comment.update({
        where: {
            id: commentId
        },
        data: {
            content: content,
        }
    });

    res.status(201).json(comment);

};

async function deleteComment(req, res) {

    const commentId = req.params.commentid;

    const comment = await prisma.comment.delete({
        where: {
            id: commentId
        }
    });

    res.status(201).json(comment);

}

module.exports = {
    getComments,
    createComment,
    editComment,
    deleteComment
}