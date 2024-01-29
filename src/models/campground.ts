import { Schema, model, Types, Date } from 'mongoose';
export type TCampground = { // creo l'interfaccia da utilizzare come base per il mio schema mongoose
    title: string,
    price: string,
    description: string,
    location: string

};

// creo uno schema mongoose
const CampgroundSchema = new Schema<TCampground>({
    title: String,
    price: String,
    description: String,
    location: String
})

// infine creo il modello da utilizzare come base del mio documento mongodb e lo esporto
export const CampgroundModel = model<TCampground>('Campground', CampgroundSchema);