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
var validate_1 = require("./validate");
var categoriesController_1 = __importDefault(require("./categoriesController"));
var service = new categoriesController_1.default();
var router = express.Router();
router.get("/", function (req, res) {
    service.index().then(function (response) {
        return res.json(response);
    });
});
router.post("/add", validate_1.addAndUpdateCategoriesValidationRules(), validate_1.validate, function (req, res) {
    var categorie = {
        categorieName: req.body.name,
        categorieDescription: req.body.description,
    };
    service
        .add(categorie.categorieName, categorie.categorieDescription)
        .then(function (response) {
        res.status(201);
        return res.json(response);
    })
        .catch(function (_) {
        res.status(500);
        return res.json({ error: "error on create user" });
    });
});
router.put("/update/:id", validate_1.addAndUpdateCategoriesValidationRules(), validate_1.validate, function (req, res) {
    var categorie = {
        categorieName: req.body.name,
        categorieDescription: req.body.description,
    };
    var id = req.params.id;
    service
        .update(categorie.categorieName, id, categorie.categorieDescription)
        .then(function (response) {
        res.status(200);
        return res.json(response);
    })
        .catch(function (_) {
        res.status(500);
        return res.json({ error: "error on update user" });
    });
});
router.get("/search/:name", function (req, res) {
    var searchString = req.params.name;
    var categories = service.search(searchString);
    console.log(categories);
    if (!categories) {
        return res.json({ error: searchString + " not founded" });
    }
    return res.json(categories);
});
router.delete("/delete/:id", function (req, res) {
    var categorieId = req.params.id;
    res.set({ "Content-Type": "application/json" });
    service
        .remove(categorieId)
        .then(function (response) {
        res.status(204);
        return res.json(response);
    })
        .catch(function (error) {
        res.status(500);
        return res.json({ error: "something went wrong on delete categorie" });
    });
});
exports.default = router;
