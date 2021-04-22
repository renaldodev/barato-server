import * as express from "express";
import { addAndUpdateCategoriesValidationRules, validate } from "./validate";
import categoriesController from "./categoriesController";
const service = new categoriesController();
const router = express.Router();

router.get("/", (req, res) => {
  service.index().then(response=>{
    return res.json(response);
  });
  
});

router.post(
  "/add",
  addAndUpdateCategoriesValidationRules(),
  validate,
  (req: express.Request, res: express.Response) => {
    const categorie = {
      categorieName: req.body.name,
      categorieDescription: req.body.description,
    };
    service
      .add(categorie.categorieName, categorie.categorieDescription)
      .then((response) => {
        res.status(201);
        return res.json(response);
      })
      .catch((_) => {
        res.status(500);
        return res.json({ error: "error on create user" });
      });
  }
);

router.put(
  "/update/:id",
  addAndUpdateCategoriesValidationRules(),
  validate,
  (req: express.Request, res: express.Response) => {
    const categorie = {
      categorieName: req.body.name,
      categorieDescription: req.body.description,
    };
    const id = req.params.id;
    service
      .update(categorie.categorieName, id, categorie.categorieDescription)
      .then((response) => {
        res.status(200);
        return res.json(response);
      })
      .catch((_) => {
        res.status(500);
        return res.json({ error: "error on update user" });
      });
  }
);

router.get("/search/:name", (req, res) => {
  const searchString = req.params.name;
  const categories = service.search(searchString);
  console.log(categories)
  if (!categories) {
    return res.json({ error: `${searchString} not founded` });
  }
  return res.json(categories);
});

router.delete("/delete/:id", (req: express.Request, res: express.Response) => {
  const categorieId = req.params.id;
  res.set({ "Content-Type": "application/json" });
  service
    .remove(categorieId)
    .then((response) => {
      res.status(204);
      return res.json(response);
    })
    .catch((error) => {
      res.status(500);
      return res.json({ error: "something went wrong on delete categorie" });
    });
});

export default router;
