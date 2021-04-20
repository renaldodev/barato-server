import { PaginationOptionsType } from "../product/productFactore";
import { UserDocument } from "./userModel";

export interface IUserFactore {
  index(options: PaginationOptionsType): Promise<UserDocument[] | any>;
  add(
    name: string,
    email: string,
    type: string,
    passwordHash?: string
  ): Promise<string>;
  
  remove(id: string): Promise<string>;
  addFavorities(productId: string, userId: string): Promise<string>;
  removeFavorities(productId: string, userId: string): Promise<string>;
  findUserByID(id: string): Promise<UserDocument>;
  findUserByEmail(email: string): Promise<UserDocument | null | string>;
}
