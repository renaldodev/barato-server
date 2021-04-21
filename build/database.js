"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
function default_1() {
    mongoose_1.default
        .connect("" + process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(function (_) {
        console.log("data base connected");
    })
        .catch(function (error) {
        console.error(error);
    });
}
exports.default = default_1;
