const ensureAuthenticated = require('../Middlewares/Auth');

const router = require('express').Router();

router.get('/', ensureAuthenticated, (req, res) => {
    console.log('---- logged in user detail ---', req.user);
    res.status(200).json([
        {
        name: req.user.name,
        email: req.user.email,
        profileImage: req.user.profileImage || "",
        bio: req.user.bio || "",
    }])
});

module.exports = router;