const { prisma, generateToken } = require("../config/passport");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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

    console.log(req.body);

    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {

        if(err) {
            console.error(err);
            return res.status(500).send("Server error");
        }

        try {

            const existingUser = await prisma.user.findUnique({
                where: {
                    email: req.body.email,
                }
            });

            if(existingUser) {

                return res.send("Email already in use");

            }

            const user = await prisma.user.create({
                data: {
                    name: req.body.name,
                    email: req.body.email,
                    password: hashedPassword
                }
            });

            return res.redirect("/login");

        } catch(err) {

            console.error(err);
            return res.status(500).send("Server error");

        }

    })

}

async function loginUser(req, res) {
    try {
        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            }
        });

        if(!user) {
            return res.status(400).send("Invalid email or password");
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if(!isMatch) {
            return res.status(400).send("Invalid email or password");
        }

        const token = generateToken();

        return res.json({ token });

    } catch(err) {
        console.error(err);
        return res.status(500).send("Server error");
    }
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

function authenticateToken(req, res, next) {
    const token = req.headers['authorization'];
    if(!token) return res.status(401).send("Access denied");

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err) return res.status(403).send("Invalid token");

        req.user = user;
        next();
    })
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    authenticateToken
}