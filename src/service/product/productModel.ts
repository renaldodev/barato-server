import * as mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface ProductDocument extends mongoose.Document {
  name: string;
  price: number;
  description: string;
  categorie: string;
  isAvable: boolean;
}

export interface ProductModel extends mongoose.PaginateModel<ProductDocument> {}

const productSchemma = new mongoose.Schema({
  name: { type: String, require: true },
  price: { type: Number, require: true },
  description: String,
  categorie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Categories",
    require: true,
  },
  isAvable: { type: Boolean, default: true },
});

productSchemma.plugin(mongoosePaginate);
const Product = mongoose.model<ProductDocument>("Product", productSchemma);

export default Product as ProductModel;
