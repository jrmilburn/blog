const { prisma } = require("../config/passport");

async function getUsers(req, res) {

    const users = await prisma.user.findMany();

    return res.send(users);

}

async function getUser(req, res) {

    const user = await prisma.user.findUnique({
        where: {
            id: req.params.userid,
        }
    })

    return res.send(user);

}

async function createUser(req, res) {

    const mockUser = {
        name: "joe",
        email: "joe@joe.com",
        password: "joepw"
    }

    const user = await prisma.user.create({
        data: {
            name: mockUser.name,
            email: mockUser.email,
            password: mockUser.password,
        }
    })

    return res.send(user);

}

async function updateUser(req, res) {

    const user = await prisma.user.update({
        where: {
            id: req.params.userid,
        },
        data: {
            name: req.body.name,
            email: req.body.email,
        }
    })

}

async function deleteUser(req, res) {

    const user = await prisma.user.delete({
        where: {
            id: req.params.userid,
        }
    })

}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser
}