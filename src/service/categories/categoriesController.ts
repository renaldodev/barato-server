import { ICategoriesFactore } from "./categoriesFactore";
import { CategoriesDocument } from "./categoriesModel";
import Categories from "./categoriesModel";

export default class CategoriesController implements ICategoriesFactore {
  async index(): Promise<CategoriesDocument[]> {
    const categories = await Categories.find();
    return Promise.resolve(categories);
  }
  async add(name: string, description?: string): Promise<string> {
    const categories = {
      categorieName: name,
      categorieDescription: description,
    } as CategoriesDocument;

    const newCategorie = new Categories(categories);
    await newCategorie.save();
    return Promise.resolve("Categorie add");
  }
  async update(
    name: string,
    categorieId: string,
    description?: string
  ): Promise<string> {
    const categories = {
      categorieName: name,
      categorieDescription: description,
    } as CategoriesDocument;

    await Categories.updateOne({ _id: categorieId }, categories);
    return Promise.resolve("Categorie updated");
  }

  async remove(id: string): Promise<string> {
    const categorie = await Categories.findOne({ _id: id });
    if (!categorie) {
      return Promise.reject("categorie not found");
    }
    await Categories.remove({ _id: id });
    return Promise.resolve("Categorie removed succefull");
  }
  escapeRegex(text: string) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
  search(name: string): any {
    const regex = new RegExp(this.escapeRegex(name), "gi");
    Categories.find({ $text: { $search: name } }, function (err, docs) {
      if (err) {
        return Promise.reject(err);
      }
      return Promise.resolve(docs);
    });
  }
}
