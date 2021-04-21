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
var baysController_1 = __importDefault(require("./baysController"));
var validate_1 = require("./validate");
var router = express.Router();
var service = new baysController_1.default();
router.get("/", function (req, res) {
    service.index({ limit: 20, page: 1 }).then(function (response) {
        res.status(200);
        res.set({ "Content-Type": "application/json" });
        return res.json(response);
    });
});
router.get("/:id", function (req, res) {
    res.status(400);
    res.set({ "Content-Type": "application/json" });
    service
        .getBaysByUserId(req.params.id)
        .then(function (response) {
        res.status(200);
        res.set({ "Content-Type": "application/json" });
        return res.json(response);
    })
        .catch(function (_) {
        res.status(406);
        res.json({ error: "Bay not found" });
    });
});
router.post("/add", validate_1.addAndUpdateBaysValidationRules(), validate_1.validate, function (req, res) {
    var bay = {
        user: req.body.user,
        products: req.body.products,
        total: req.body.total,
    };
    service
        .add(bay)
        .then(function (response) {
        res.status(201);
        return res.json(response);
    })
        .catch(function (error) {
        res.status(500);
        res.json({ error: "Something went wrong on create bays" });
    });
});
router.delete("/delete/:id", function (req, res) {
    var baysId = req.params.id;
    res.set({ "Content-Type": "application/json" });
    service
        .remove(baysId)
        .then(function (response) {
        res.status(204);
        return res.json(response);
    })
        .catch(function (error) {
        res.status(500);
        return res.json({ error: "something went wrong on delete Bays" });
    });
});
router.put("/canseled/:id", function (req, res) {
    var baysId = req.params.id;
    service
        .setBayAsCanseled(baysId)
        .then(function (response) {
        res.status(204);
        return res.json(response);
    })
        .catch(function (_) {
        res.status(500);
        return res.json({ error: "Something went wrong on set as canseled" });
    });
});
router.put("/fineshed/:id", function (req, res) {
    var baysId = req.params.id;
    service
        .setBayAsFinished(baysId)
        .then(function (response) {
        res.status(204);
        return res.json(response);
    })
        .catch(function (_) {
        res.status(500);
        return res.json({ error: "Something went wrong on set as fineshed" });
    });
});
exports.default = router;
