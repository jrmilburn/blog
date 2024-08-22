const { prisma } = require("../config/passport");

async function getComments(req, res) {

    const { postid } = req.params;

    const comments = await prisma.comment.findMany({
        where: {
            postId: postid
        },
        include: { author: true, post: true }
    });

    return res.json({
        comments
    })

}

async function createComment(req, res) {

    
    const { content } = req.body;
    const { postid } = req.params;

    const comment = await prisma.comment.create({
        data: {
            content: content,
            post: {
                connect: {id: postid}
            },
            author: {
                connect: {id: req.user.id}
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