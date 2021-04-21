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
var mongoose = __importStar(require("mongoose"));
var mongoose_paginate_v2_1 = __importDefault(require("mongoose-paginate-v2"));
var baysSchemma = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", require: true },
    products: [
        {
            qtd: Number,
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                require: true,
            },
        },
    ],
    total: { type: Number, require: true },
    processing: { type: Boolean, default: true },
    fished: Boolean,
    canseled: Boolean,
    finishedDate: Date,
    canseledDate: Date,
}, {});
baysSchemma.plugin(mongoose_paginate_v2_1.default);
var Bays = mongoose.model("Bays", baysSchemma);
exports.default = Bays;
