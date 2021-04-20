import * as express from "express";
import { UserDocument } from "./userModel";
import User from "./userController";
const router = express.Router();
const service = new User();

router.get("/", (req: express.Request, res: express.Response) => {
  service.index({ limit: 20, page: 1 }).then((response) => {
    res.status(200);
    res.set({ "Content-Type": "application/json" });
    return res.json(response);
  });
});

router.post("/add", (req: express.Request, res: express.Response) => {
  const user = req.body;
  res.set({ "Content-Type": "application/json" });
  service
    .add(user.name, user.email, user.type, user.passwordHash)
    .then((response) => {
      res.status(201);
      return res.json(response);
    })
    .catch((_) => {
      res.status(400);
      res.json({ error: "Something went wrong on add user" });
    });
});

router.get("/:id", (req: express.Request, res: express.Response) => {
  res.set({ "Content-Type": "application/json" });
  service
    .findUserByID(req.params.id)
    .then((response) => {
      res.status(200);
      res.set({ "Content-Type": "application/json" });
      return res.json(response);
    })
    .catch((_) => {
      res.status(406);
      res.json({ error: "User not founded" });
    });
});

router.get("/email/:email", (req: express.Request, res: express.Response) => {
  res.set({ "Content-Type": "application/json" });
  service
    .findUserByEmail(req.params.email)
    .then((response) => {
      res.status(200);
      res.set({ "Content-Type": "application/json" });
      return res.json(response);
    })
    .catch((_) => {
      res.status(406);
      res.json({ error: "User not founded" });
    });
});


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
      return res.json({ error: "something went wrong on delete user" });
    });
});

router.put("/addfavorite/:userId/:productId",(req:express.Request,res:express.Response)=>{
  const userId=req.params.userId;
  const productId=req.params.productId;
  service.addFavorities(productId,userId).then((response)=>{
    res.status(200)
    return res.json(response)
  }).catch(_=>{
    res.status(500)
    return res.json({error:"Something went wrong on add favorities"})
  })
})
router.put("/removefavorite/:userId/:productId",(req:express.Request,res:express.Response)=>{
  const userId=req.params.userId;
  const productId=req.params.productId;
  service.removeFavorities(productId,userId).then((response)=>{
    res.status(200)
    return res.json(response)
  }).catch(_=>{
    res.status(500)
    return res.json({error:"Something went wrong on remove favorities"})
  })
})

export default router;
