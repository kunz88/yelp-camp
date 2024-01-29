
import { connect, connection, mongo } from 'mongoose';
import { CampgroundModel } from '../models/campground';
import { cities } from './cities';
import { places,descriptors } from './seedHelpers';
const url = 'mongodb://127.0.0.1:27017/yelp-camp'

connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`Couldn't connect to MongoDB: ${err}`);
  });

  const sample = (array:string[]):string => array[Math.floor(Math.random() * array.length)];// funzione che permette di passare un array come parametro e restituisce un 
  // valore  a caso in quell'array

  const seedDB = async () => { // creao dinamicamente il mio database con dati presi randomicamente

    await CampgroundModel.deleteMany({})
    for(let i = 0; i < 50 ; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const camp = new CampgroundModel({
            location:`${cities[random1000].city},${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`
        })
        await camp.save()// salvo il mio 
    }

  }

  seedDB().then(()=>{
    connection.close()
  })