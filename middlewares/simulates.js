import User from '../models/User.js';
import Money from '../models/Money.js';

// Select a random user, create and give a random amount of money to him/her and collect %2 of money to prize
export const createMoney = async () => {
    const moneytoUser = Math.floor(Math.random() * 100 * (98 / 100)) * 10;
    const moneyToPool = Math.floor((moneytoUser / 98) * 2);
    const randomUser = `user${Math.floor(Math.random() * 150)}`

    try {
        const selectedUser = await User.findOne({ "username": randomUser });
        selectedUser.weeklyMoney = selectedUser.weeklyMoney + moneytoUser;
        const poolMoney = await Money.findOne({ "name": 'pool money' });
        poolMoney.amount = poolMoney.amount + moneyToPool;
        selectedUser.save();
        poolMoney.save();
    } catch (err) {
        console.log(err);
    }
}

// Distrubute Money at the end of the week
export const distributeMoney = async () => {
    try {
        const poolMoney = await Money.findOne({ "name": 'pool money' });
        const allUsers = await User.find({});
        allUsers.sort((a, b) => b.rank >= a.rank ? 1 : b.rank < a.rank ? -1 : 0)
        allUsers[0].totalMoney = Math.floor((poolMoney.amount / 0.20) + allUsers[0].totalMoney); // %20 of the pool money to the first user in sorted by ranking.
        allUsers[1].totalMoney = Math.floor((poolMoney.amount * 0.15) + allUsers[1].totalMoney); // %15 of the pool money to the first user in sorted by ranking.
        allUsers[2].totalMoney = Math.floor((poolMoney.amount * 0.10) + allUsers[2].totalMoney); // %10 of the pool money to the first user in sorted by ranking.
        allUsers[0].save();
        allUsers[1].save();
        allUsers[2].save();
        for (let i = 3; i < 101; i++) {
            allUsers[i].totalMoney = Math.floor(poolMoney.amount * 0.0045) // the rest of the pool money(%45) to top users evenly.
            allUsers[i].save();
        }
        poolMoney.amount = 0;
        poolMoney.save();
    } catch (err) {
        console.log(err)
    }
}

export const defineAnewRank = async () => {
    const randomUser = `user${Math.floor(Math.random() * 150)}`;
    const newRank = Math.floor(Math.random() * 1000);
    try {
        const selectedUser = await User.findOne({ "username": randomUser });
        selectedUser.rankYesterday = selectedUser.rank;
        selectedUser.rank = newRank;
        selectedUser.save();

    } catch (err) {
        console.log(err);
    }
}

