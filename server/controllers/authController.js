import User from "../models/userModel.js";
import bcryptjs from 'bcryptjs';

const signup = async (req, res, next) => {
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

export default signup;