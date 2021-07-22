import User from '../models/User.js';

export const getUsersById = async (req, res) => {
    try {
        const users = await User.find({});
        users.sort((a, b) => b.rank >= a.rank ? 1 : b.rank < a.rank ? -1 : 0)
        const topUsers = users.slice(0, 100);
        let isFindedUser = false;
        topUsers.forEach(user => {
            if(user._id == req.params.userId) {
                isFindedUser = true;
            }
        })
        if (!isFindedUser) {
            for (let i = 101; i < 150; i++) {
                if (users[i]._id == req.params.userId) {
                    topUsers.push(users[i - 3])
                    topUsers.push(users[i - 2])
                    topUsers.push(users[i - 1])
                    topUsers.push(users[i]);
                    topUsers.push(users[i + 1])
                    topUsers.push(users[i + 2])
                }
            }
        }
        res.json(topUsers);
    } catch (err) {
        res.json({ message: err.message });
    }
}