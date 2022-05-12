const router = require('express').Router();
const {
    getAllUser,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend

} = require('../../controllers/user-controller')

// api/users
router
    .route('/')
    .get(getAllUser)
    .post(createUser)

// /api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser)
    .post(addFriend)

// /api/users/:userId/friends/:friendId
router
    .route('/:id/:friendId')
    .delete(removeFriend)

module.exports = router;