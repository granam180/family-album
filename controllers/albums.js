const Album = require('../models/album');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });
const { cloudinary } = require("../cloudinary");


module.exports.index = async (req, res) => {
    const albums = await Album.find({}).populate('popupText');
    res.render('albums/index', { albums })
}

module.exports.renderNewForm = (req, res) => {
    res.render('albums/new');
}

module.exports.createAlbum = async (req, res, next) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.album.location,
        limit: 1
    }).send()
    const album = new Album(req.body.album);
    album.geometry = geoData.body.features[0].geometry;
    album.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    album.author = req.user._id;
    await album.save();
    // console.log(album);
    req.flash('success', 'Successfully made a new album!');
    res.redirect(`/albums/${album._id}`)
}

module.exports.showAlbum = async (req, res,) => {
    const album = await Album.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
    }).populate('author');
    if (!album) {
        req.flash('error', 'Cannot find that album!');
        return res.redirect('/albums');
    }
    res.render('albums/show', { album });
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params;
    const album = await Album.findById(id)
    if (!album) {
        req.flash('error', 'Cannot find that album!');
        return res.redirect('/albums');
    }
    res.render('albums/edit', { album });
}

module.exports.updateAlbum = async (req, res) => {
    const { id } = req.params;
    // console.log(req.body);
    const album = await Album.findByIdAndUpdate(id, { ...req.body.album });
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    album.images.push(...imgs);
    await album.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await album.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfully updated album!');
    res.redirect(`/albums/${album._id}`)
}

module.exports.deleteAlbum = async (req, res) => {
    const { id } = req.params;
    await Album.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted album')
    res.redirect('/albums');
}