const Album = require('../models/album');
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
    const album = await Album.findById(req.params.id);
    const review = new Review(req.body.review);
    review.author = req.user._id;
    album.reviews.push(review);
    await review.save();
    await album.save();
    req.flash('success', 'Created new review!');
    res.redirect(`/albums/${album._id}`);
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Album.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/albums/${id}`);
}
