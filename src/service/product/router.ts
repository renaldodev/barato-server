import * as express from "express";
import { ProductDocument } from "./productModel";
import Product from "./productController";
import { addAndUpdateProductValidationRules, validate } from "./validate";

const router = express.Router();
const service = new Product();

router.get("/", (req: express.Request, res: express.Response) => {
  service.index({ limit: 20, page: 1 }).then((response) => {
    res.status(200);
    res.set({ "Content-Type": "application/json" });
    return res.json(response);
  });
});

router.get("/:id", (req: express.Request, res: express.Response) => {
  res.status(400);
  res.set({ "Content-Type": "application/json" });
  service
    .getProductByID(req.params.id)
    .then((response) => {
      res.status(200);
      res.set({ "Content-Type": "application/json" });
      return res.json(response);
    })
    .catch((_) => {
      res.status(406);
      res.json({ error: "Product not founded" });
    });
});

router.post(
  "/add",
  addAndUpdateProductValidationRules(),
  validate,
  (req: express.Request, res: express.Response) => {
    const product = req.body as ProductDocument;
    service
      .add(product)
      .then((response) => {
        res.status(201);
        return res.json(response);
      })
      .catch((_) => {
        res.status(500);
        res.json({ error: "Something went wrong on create product" });
      });
  }
);

router.delete("/delete/:id", (req: express.Request, res: express.Response) => {
  const productId = req.params.id;
  res.set({ "Content-Type": "application/json" });
  service
    .remove(productId)
    .then((response) => {
      res.status(204);
      return res.json(response);
    })
    .catch((error) => {
      res.status(500);
      return res.json({ error: "something went wrong on delete product" });
    });
});

router.put("/enable/:id", (req, res) => {
  service.setEnable(req.params.id).then((response) => {
    res.status(204);
    return res.json(response);
  });
});

router.put("/avable/:id", (req, res) => {
  service.setAvable(req.params.id).then((response) => {
    res.status(204);
    return res.json(response);
  });
});
export default router;
