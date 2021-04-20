import * as mongoose from "mongoose";
import paginatePlugin from "mongoose-paginate-v2";
export interface BaysDocument extends mongoose.Document {
  user: string;
  products: [{ qtd: number; productId: string }];
  total: number;
  processing: boolean;
  fished: boolean;
  canseled: boolean;
  finishedDate: Date;
  canseledDate: Date;
}

export interface BaysModel extends mongoose.PaginateModel<BaysDocument> {}

const baysSchemma = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    products: [
      {
        qtd: Number,
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          require: true,
        },
      },
    ],
    total: { type: Number, require: true },
    processing: { type: Boolean, default: true },
    fished: Boolean,
    canseled: Boolean,
    finishedDate: Date,
    canseledDate: Date,
  },
  {}
);
baysSchemma.plugin(paginatePlugin);
const Bays = mongoose.model<BaysDocument>("Bays", baysSchemma);
export default Bays as BaysModel;
