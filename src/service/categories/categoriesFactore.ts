import { CategoriesDocument } from "./categoriesModel";

export interface ICategoriesFactore {
  index(): Promise<CategoriesDocument[]>;
  add(name: string, description?: string): Promise<string>;
  update(
    name: string,
    categorieId: string,
    description?: string
  ): Promise<string>;
  remove(id: string): Promise<string>;
  search(name: string): any;
}
