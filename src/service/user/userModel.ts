import * as mongoose from "mongoose";
import mongoosePagination from "mongoose-paginate-v2";
export interface UserDocument extends mongoose.Document {
  name: string;
  email: string;
  phone: string;
  typeAuth: string;
  password?: string;
  address: [{street: string; adictional: string }];
  favorities: Array<string>;
}

interface UserModel extends mongoose.PaginateModel<UserDocument> {}

const userSchemma = new mongoose.Schema({
  name: { type: String, require: true, trim: true },
  email: { type: String, require: true, unique: true, trim: true },
  phone: { type: String, unique: true, trim: true },
  typeAuth: { type: String, require: true },
  password: String,
  favorities: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  address: [
    {
      street: { type: String },
      adictional: { type: String },
    },
  ],
});

userSchemma.plugin(mongoosePagination);
const User = mongoose.model<UserDocument>("User", userSchemma);
export default User as UserModel;
