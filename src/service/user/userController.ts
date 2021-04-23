import { PaginationOptionsType } from "../product/productFactore";
import { IUserFactore } from "./userFactore";
import { UserDocument } from "./userModel";
import User from "./userModel";
import * as mongoose from "mongoose";
export default class UserController implements IUserFactore {
  async add(
    name: string,
    email: string,
    type: string,
    passwordHash?: string
  ): Promise<string> {
    const savedUser = new User({
      type: type,
      name: name,
      email: email.toLowerCase(),
    });

    if (passwordHash) savedUser.password = passwordHash;
    await savedUser.save();
    return savedUser.id;
  }
  async findUserByEmail(email: string): Promise<string | UserDocument | null> {
    const user = await User.findOne({ email: email.toLowerCase() }).populate([
      "favorities",
    ]);
    if (!user) return Promise.reject("User not found");

    return Promise.resolve(new User(user));
  }

  async findUserByID(id: string): Promise<UserDocument> {
    const user = await User.findOne({ _id: id }).populate([
      "favorities",
    ]);
    if (!user) return Promise.reject("User not found");

    return Promise.resolve(new User(user));
  }

  async index(options: PaginationOptionsType): Promise<any> {
    const users = await User.paginate({}, options);
    return Promise.resolve(users);
  }

  async remove(id: string): Promise<string> {
    const user = await User.findOne({ _id: id });
    if (!user) {
      return Promise.reject("User not found");
    }
    await User.deleteOne({ _id: id });
    return Promise.resolve("User removed succefull");
  }

  async addFavorities(productId: string, userId: string): Promise<string> {
    try {
      // await User.updateOne(
      //   { _id: userId },
      //   { $push: { favorities: productId } }
      // );
      const user = await User.findOne({ _id: userId });
      user?.favorities.push(productId);
      await user?.save();
    } catch (_) {
      Promise.reject("Something went wrong to add favorities");
    }
    return Promise.resolve("Favorite add ");
  }

  async removeFavorities(productId: string, userId: string): Promise<string> {
    try {
      await User.updateOne(
        { _id: userId },
        { $pull: { favorities: productId } }
      );
    } catch (_) {
      return Promise.reject("Something went wrong on remove favorities");
    }

    return Promise.resolve("Favorite remove");
  }

  async addAddress(
    street: string,
    adictional: string,
    userId: string
  ): Promise<string> {
    try {
      // await User.updateOne(
      //   { _id: userId },
      //   { $push: { favorities: productId } }
      // );
      const user = await User.findOne({ _id: userId });
      user?.address.push({street, adictional });
      await user?.save();
    } catch (_) {
      Promise.reject("Something went wrong to add address");
    }
    return Promise.resolve("Address add ");
  }
  async removeAddress(addressId: string, userId: string): Promise<string> {
    try {
      await User.updateOne(
        { _id: userId },
        { $pull: { address: { _id: addressId } } }
      );
    } catch (_) {
      return Promise.reject("Something went wrong on remove favorities");
    }

    return Promise.resolve("Favorite remove");
  }
}
