import { ProductDocument } from "./productModel";

export interface IProductFactore {
  index(options: PaginationOptionsType): Promise<ProductDocument[] | any>;
  getProductByID(id: string): Promise<ProductDocument | string | null>;
  add(product: ProductDocument): Promise<string>;
  remove(id: string): Promise<string>;
}

export type PaginationOptionsType = {
  limit: number;
  page: number;
};
