"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var userController_1 = __importDefault(require("./userController"));
var router = express.Router();
var service = new userController_1.default();
router.get("/", function (req, res) {
    service.index({ limit: 20, page: 1 }).then(function (response) {
        res.status(200);
        res.set({ "Content-Type": "application/json" });
        return res.json(response);
    });
});
router.post("/add", function (req, res) {
    var user = req.body;
    res.set({ "Content-Type": "application/json" });
    service
        .add(user.name, user.email, user.type, user.passwordHash)
        .then(function (response) {
        res.status(201);
        return res.json(response);
    })
        .catch(function (_) {
        res.status(400);
        res.json({ error: "Something went wrong on add user" });
    });
});
router.get("/:id", function (req, res) {
    res.set({ "Content-Type": "application/json" });
    service
        .findUserByID(req.params.id)
        .then(function (response) {
        res.status(200);
        res.set({ "Content-Type": "application/json" });
        return res.json(response);
    })
        .catch(function (_) {
        res.status(406);
        res.json({ error: "User not founded" });
    });
});
router.get("/email/:email", function (req, res) {
    res.set({ "Content-Type": "application/json" });
    service
        .findUserByEmail(req.params.email)
        .then(function (response) {
        res.status(200);
        res.set({ "Content-Type": "application/json" });
        return res.json(response);
    })
        .catch(function (_) {
        res.status(406);
        res.json({ error: "User not founded" });
    });
});
router.delete("/delete/:id", function (req, res) {
    var productId = req.params.id;
    res.set({ "Content-Type": "application/json" });
    service
        .remove(productId)
        .then(function (response) {
        res.status(204);
        return res.json(response);
    })
        .catch(function (error) {
        res.status(500);
        return res.json({ error: "something went wrong on delete user" });
    });
});
router.put("/addfavorite/:userId/:productId", function (req, res) {
    var userId = req.params.userId;
    var productId = req.params.productId;
    service.addFavorities(productId, userId).then(function (response) {
        res.status(200);
        return res.json(response);
    }).catch(function (_) {
        res.status(500);
        return res.json({ error: "Something went wrong on add favorities" });
    });
});
router.put("/removefavorite/:userId/:productId", function (req, res) {
    var userId = req.params.userId;
    var productId = req.params.productId;
    service.removeFavorities(productId, userId).then(function (response) {
        res.status(200);
        return res.json(response);
    }).catch(function (_) {
        res.status(500);
        return res.json({ error: "Something went wrong on remove favorities" });
    });
});
exports.default = router;
