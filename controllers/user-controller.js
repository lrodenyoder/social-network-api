const { User } = require('../models');

const userController = {
    //get all users
    getAllUser(req, res) {
        User.find({})
        .select("-__v")
        .sort({ _id: -1 })
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //get one user by id
    getUserById({params}, res) {
        User.findOne({ _id: params.id })
        .select("-__v")
        .then((dbUserData) => {
            if(!dbUserData) {
                res.status(404).json({message: "User not found"})
                return;
            }
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //create a new user
    createUser({body}, res) {
        User.create(body)
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //update user by id
    updateUser({params, body}, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
        .then((dbUserData) => {
            if(!dbUserData){
                res.status(404).json({message: "User not found"});
                return;
            }
            res.json(dbUserData)
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },

    //delete user
    deleteUser({params}, res) {
        User.findOneAndDelete({ _id: params.id })
        .then((dbUserData) => {
            if(!dbUserData){
                res.status(404).json({message: "User not found"});
                return;
            }
            res.json(dbUserData);
        })
        .catch((err) => res.status(400).json(err));
    },

    //add friend
    addFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $push: {friends: params.userId}},
            { new: true }
            )
            .then((dbUserData) => {
                if(!dbUserData) {
                    res.status(404).json({message: "User not found"});
                    return;
                }
                res.json(dbUserData);
            })
            .catch((err) => res.json(err));
    },

    //remove friend
    removeFriend({params}, res) {
        User.findOneAndUpdate(
            { _id: params.userId},
            { $pull: {friendId: params.reactionId}},
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = userController;