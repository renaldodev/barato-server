import { PaginationOptionsType } from "../product/productFactore";
import { IBaysFactore } from "./baysFactore";
import { BaysDocument } from "./baysModel";
import Bays from "./baysModel";

export default class BaysController implements IBaysFactore {
  async setBayAsFinished(id: string): Promise<string> {
    await Bays.updateOne(
      { _id: id },
      {
        fished: true,
        finishedDate: new Date(Date.now()),
        processing:false,
        canseled: false,
        canseledDate: new Date(0),
      }
    );
    return Promise.resolve("Set Fineshed OK");
  }

  async setBayAsCanseled(id: string): Promise<string> {
    await Bays.updateOne(
      { _id: id },
      {
        fished: false,
        finishedDate: new Date(0),
        processing:false,
        canseled: true,
        canseledDate: new Date(Date.now()),
      }
    );
    return Promise.resolve("Set Canseled OK");
  }

  async index(options: PaginationOptionsType): Promise<BaysDocument[] | any> {
    const bays = await Bays.paginate({}, options);
    return Promise.resolve(bays);
  }

  async add(bay: BaysDocument): Promise<string> {
    const newBay = new Bays(bay);
    await newBay.save();
    return Promise.resolve("Bays Add");
  }
  
  async remove(id: string): Promise<string> {
    const bay = await Bays.findOne({ _id: id });
    if (!bay) {
      return Promise.reject("Product not found");
    }
    await Bays.deleteOne({ _id: id });
    return Promise.resolve("Product removed succefull");
  }
  async getBaysByUserId(
    userId: string
  ): Promise<BaysDocument[] | null | string> {
    const bays = await Bays.find({ user: userId });
    if (!bays) {
      return Promise.resolve("Bays not found");
    }
    return Promise.resolve(bays);
  }
}
