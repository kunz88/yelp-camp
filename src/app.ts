import express, { Request, Response } from 'express';
import { connect } from 'mongoose';     // importo connessione e app express , inoltre inoltro le route da utilizzare all'interno della mia app
import path from 'path'
import campground from './routes/campground'
import methodOverride from 'method-override'
const ejsMate = require('ejs-mate');

const app = express() // creo app express 
const url = 'mongodb://127.0.0.1:27017/yelp-camp' // url mongo

// asa ejs-locals per tutti gli ejs templates:
app.engine('ejs', ejsMate);
app.set('views',path.join(__dirname,'views')); // configurazione sistema di rendering, path.join è una funzione di node che si occupa di creare percorsi
app.set('view engine','ejs');// imposta il motore di rendering dei template.

app.listen(3000,()=> { //connessione al local host
    console.log("App is listening on port 3000")

})
app.use(express.urlencoded({ extended: true }));
connect(url) // connessione al database
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(`Couldn't connect to MongoDB: ${err}`);
  });
app.use(methodOverride('_method'));
app.use(express.json()); // app.use permette di runnare una funzione su ogni richiesta
app.use("/campgrounds", campground); // uso della route

app.use((_:Request,res:Response)=>{
  res.status(404).send('NOT FOUND')
})
