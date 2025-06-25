const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpCampDb', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("Error, MONGO CONNECTION!!!!")
        console.log(err)
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6825b96ae714d9f7dcfc4daa',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia molestiae, reiciendis dolorem nostrum ipsam quos quam soluta fugiat doloremque iste, asperiores laboriosam accusamus, quia totam suscipit reprehenderit earum alias voluptas.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dlmzbbnjm/image/upload/v1746701264/YelpCamp/j0w0h0jid6zdbzdeb0bg.jpg',
                  filename: 'YelpCamp/j0w0h0jid6zdbzdeb0bg',
                },
                {
                  url: 'https://res.cloudinary.com/dlmzbbnjm/image/upload/v1746701265/YelpCamp/dwkfc9luvtw3sh6k0xnn.jpg',
                  filename: 'YelpCamp/dwkfc9luvtw3sh6k0xnn',
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})