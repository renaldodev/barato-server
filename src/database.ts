import mongoose from "mongoose";
export default function () {
  mongoose
    .connect(`${process.env.MONGO_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then((_) => {
      console.log("data base connected");
    })
    .catch((error) => {
      console.error(error);
    });
}
