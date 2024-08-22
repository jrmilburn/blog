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

            return res.send(user);

        } catch(err) {

            console.error(err);
            return res.status(500).send("Server error");

        }

    })

}

async function loginUser(req, res) {
    try {
        console.log('Login attempt:', req.body);

        const user = await prisma.user.findUnique({
            where: {
                email: req.body.email,
            }
        });

        if (!user) {
            console.log('User not found');
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const isMatch = await bcrypt.compare(req.body.password, user.password);

        if (!isMatch) {
            console.log('Password does not match');
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = generateToken(user);
        console.log('Login successful, token generated');

        return res.status(200).json({ token, user });
    } catch (err) {
        console.error('Server error during login:', err);
        return res.status(500).json({ message: "Server error" });
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

module.exports = {
    getUsers,
    getUser,
    createUser,
    loginUser,
    updateUser,
    deleteUser,
}