const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

router
    .route('/')
    .get(getAllThoughts)

router
    .route('/:thoughtId')
    .get(getThoughtById)

router
    .route('/:userId')
    .post(createThought)

router
    .route('/:userId/:thoughtId')
    .put(updateThought)
    .delete(deleteThought)
    .put(addReaction)

router
    .route('/:userId/:thoughtId/:reactionId')
    .delete(removeReaction)

module.exports = router;