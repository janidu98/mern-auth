import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    
    try {
        const hashedPassword = await bcryptjs.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword});
        if(!newUser) return res.status(400).json({ message: 'User not created!'});

        await newUser.save();
        res.status(201).json({ message: "User created successfully"});

    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        //check whether user is valid or not
        const validUser = await User.findOne({ email });
        if(!validUser) return next(errorHandler(404, 'User not found'));

        //check whether password is valid or not
        const validPassword = bcryptjs.compareSync(password, validUser.password);
        if(!validPassword) return next(errorHandler(401, 'wrong credentials'));

        //create token
        const token = jwt.sign({ id: validUser._id}, process.env.JWT_SECRET);
        const { password: hashedPassword, ...rest} = validUser._doc;

        //set expire time for 1 hour
        const expiryDate = new Date(Date.now() + 3600000);
        //set cookies
        res.cookie('access_token', token, {httpOnly: true, expires: expiryDate}).status(200).json(rest);

    } catch (error) {
        next(error);
    }
}

