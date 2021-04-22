import { IProductFactore, PaginationOptionsType } from "./productFactore";
import { ProductDocument } from "./productModel";
import Product from "./productModel";

export default class ProductController implements IProductFactore {
  async setAvable(id: string): Promise<string> {
    await Product.updateOne({_id:id},{isAvable:true});
      return Promise.resolve("Product updated");
  }
 async setEnable(id: string): Promise<string> {
    await Product.updateOne({_id:id},{isAvable:false});
      return Promise.resolve("Product updated");
  }
  async index(
    options: PaginationOptionsType
  ): Promise<ProductDocument[] | any> {
    const products = await Product.paginate({}, options);
    return Promise.resolve(products);
  }

  async getProductByID(id: string): Promise<ProductDocument | string | null> {
    const product = await Product.findOne({ _id: id }).populate(['categorie']);
    return product;
  }

  async add(product: ProductDocument): Promise<string> {
    const newproduct = new Product(product);
    await newproduct.save();
    return Promise.resolve("Product add");
  }
  async remove(id: string): Promise<string> {
    const product = await Product.findOne({ _id: id });
    if (!product) {
      return Promise.reject("Product not found");
    }
    await Product.deleteOne({ _id: id });
    return Promise.resolve("Product removed succefull");
  }
}
