import User from '../models/User.js';

export const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).lean();
        res.json(users);
    } catch (err) {
        res.json({ message: err.message });
    }
}