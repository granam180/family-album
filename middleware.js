const { albumSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Album = require('./models/album');
const Review = require('./models/review');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.validateAlbum = (req, res, next) => {
    const { error } = albumSchema.validate(req.body);
    console.log(req.body);
    
    const maxSize = 35000000; // Increase this value to your desired max size in bytes.

    if (error) {
        const msg = error.details.map(el => el.message).join(',');
        throw new ExpressError(msg, 400);
    } else {
        // Check if the uploaded file size exceeds maxSize
        if (req.file && req.file.size > maxSize) {
            throw new ExpressError("File size exceeds the allowed limit.", 400);
        } else {
            next();
        }
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params;
    const album = await Album.findById(id);
    if (!album.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/albums/${id}`);
    }
    next();
}

module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/albums/${id}`);
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}