#  Family Album 📸

 <p align="center">
  <img src="https://firebasestorage.googleapis.com/v0/b/react-portfolio-dashboar-f6b3a.appspot.com/o/portfolio%2Ffamily-album.png?alt=media&token=ffb3d0bf-e658-4da7-aba3-c49fa07499c9&_gl=1*1jqqzcz*_ga*MzA4NzMyNDQ0LjE2OTY4MDE5OTA.*_ga_CW55HF8NVT*MTY5NjgwMTk4OS4xLjEuMTY5NjgwMjA4OC4yMS4wLjA." alt="Family Album"
 </p>

<a href="https://family-album.fly.dev/" target="_blank">Family Album</a> is a *fullstack* website where users can create and review image collections from trips they've taken from either their phone or home computer, along with geotagging by location to be identified on a map. In order to review or create an album of images, you must have an account. This project was part of Colt Steele's web dev course on Udemy to build a Fullstack Campgrounds app.  

## Tech
This project was created using Node.js, Express, MongoDB, and Bootstrap. Passport.js was used to handle authentication. Fly.io services for backend deployment.  

## Features
* Users can create, edit, and remove campgrounds
* Users can review campgrounds once, and edit or remove their review
* User profiles include more information on the user (full name, email, phone, join date), their campgrounds, and the option to edit their profile or delete their account
* Search campground by name or location
* Sort campgrounds by highest rating, most reviewed, lowest price, or highest price

## Run it locally
1. Install [mongodb](https://www.mongodb.com/)
2. Create a cloudinary account to get an API key and secret code to store images on their cloud service
3. Create a .env file (or just export manually in the terminal) in the root of the project and add the following:  

```
CLOUDINARY_CLOUD_NAME=='<name>'
CLOUDINARY_KEY=''<key>
CLOUDINARY_SECRET='<secret>'
```
## Clone

```
git clone https://github.com/granam180/family-album.git
cd family-album
npm install
```
## Built With

- [Node.js](https://nodejs.org) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
- [express](https://expressjs.com//) - Fast, unopinionated, minimalist web framework for Node.js
- [Fly.io](https://fly.io/) - Fly is a platform for running full stack apps and databases close to your users
- [MongoDB](https://www.mongodb.com/) - The database for
  modern applications
- [Mongoose](https://mongoosejs.com/) - Elegant MongoDB object modeling for Node.js
- [ejs](https://ejs.co/) - Embedded JavaScript templating

Create a .env file (or just export manually in the terminal) in the root of the project and add the following:  

```
DATABASEURL='<url>'
API_KEY=''<key>
API_SECRET='<secret>'
```

Run ```mongod``` in another terminal and ```node app.js``` in the terminal with the project.  

Then go to [localhost:3000](http://localhost:3000/).

To get google maps working check [this](https://github.com/nax3t/google-maps-api) out.
