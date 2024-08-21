const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const prisma = new PrismaClient();

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secret: process.env.JWT_SECRET, 
}

const jwtVerify = async (jwtPayload, done) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: jwtPayload.userid},
        });

        if(!user) {
            return done(null, false, {message: "User not found"});
        }

        return done(null, user);
    } catch(err) {
        console.error(err);
    }
};

const strategy = new JwtStrategy(jwtOptions, jwtVerify);
passport.use(strategy);

const generateToken = (user) => {
    return jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
}

module.exports = {
    passport,
    generateToken,
    prisma
};