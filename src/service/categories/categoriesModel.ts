import * as mongoose from "mongoose";

export interface CategoriesDocument extends mongoose.Document {
  categorieName: string;
  categorieDescription: string;
}

const categoriesSchemma = new mongoose.Schema({
  categorieName: { type: String, require: true },
  categorieDescription: String,
})

categoriesSchemma.index({categorieName: 'text'});

export default mongoose.model<CategoriesDocument>("Categories",categoriesSchemma);