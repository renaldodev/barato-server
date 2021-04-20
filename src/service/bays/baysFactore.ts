import { PaginationOptionsType } from "../product/productFactore";
import { BaysDocument } from "./baysModel";

export interface IBaysFactore {
  index(options: PaginationOptionsType): Promise<BaysDocument[] | any>;
  add(bay: BaysDocument): Promise<string>;
  remove(id: string): Promise<string>;
  getBaysByUserId(userId: string): Promise<BaysDocument[] | null | string>;
  setBayAsFinished(id:string): Promise<string>
  setBayAsCanseled(id:string):Promise<string>
}
