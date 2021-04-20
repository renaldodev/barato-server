import * as express from "express";
import { BaysDocument } from "./baysModel";
import Bays from "./baysController";
import { addAndUpdateBaysValidationRules, validate } from "./validate";

const router = express.Router();
const service = new Bays();

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
    .getBaysByUserId(req.params.id)
    .then((response) => {
      res.status(200);
      res.set({ "Content-Type": "application/json" });
      return res.json(response);
    })
    .catch((_) => {
      res.status(406);
      res.json({ error: "Bay not found" });
    });
});

router.post(
  "/add",
  addAndUpdateBaysValidationRules(),
  validate,
  (req: express.Request, res: express.Response) => {
    const bay = {
      user: req.body.user,
      products: req.body.products,
      total: req.body.total,
    } as BaysDocument;
    service
      .add(bay)
      .then((response) => {
        res.status(201);
        return res.json(response);
      })
      .catch((error) => {
        res.status(500);
        res.json({ error: "Something went wrong on create bays" });
      });
  }
);

router.delete("/delete/:id", (req: express.Request, res: express.Response) => {
  const baysId = req.params.id;
  res.set({ "Content-Type": "application/json" });
  service
    .remove(baysId)
    .then((response) => {
      res.status(204);
      return res.json(response);
    })
    .catch((error) => {
      res.status(500);
      return res.json({ error: "something went wrong on delete Bays" });
    });
});

router.put("/canseled/:id", (req: express.Request, res: express.Response) => {
  const baysId = req.params.id;
  service
    .setBayAsCanseled(baysId)
    .then((response) => {
      res.status(204);
      return res.json(response);
    })
    .catch((_) => {
      res.status(500);
      return res.json({ error: "Something went wrong on set as canseled" });
    });
});

router.put("/fineshed/:id", (req: express.Request, res: express.Response) => {
  const baysId = req.params.id;
  service
    .setBayAsFinished(baysId)
    .then((response) => {
      res.status(204);
      return res.json(response);
    })
    .catch((_) => {
      res.status(500);
      return res.json({ error: "Something went wrong on set as fineshed" });
    });
});

export default router;
