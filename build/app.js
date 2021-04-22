"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
var express_1 = __importDefault(require("express"));
var router_1 = __importDefault(require("./service/product/router"));
var router_2 = __importDefault(require("./service/bays/router"));
var router_3 = __importDefault(require("./service/user/router"));
var router_4 = __importDefault(require("./service/categories/router"));
var body_parser_1 = __importDefault(require("body-parser"));
var database_1 = __importDefault(require("./database"));
var app = express_1.default();
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use("/api/v1/product", router_1.default);
app.use("/api/v1/bays", router_2.default);
app.use("/api/v1/user", router_3.default);
app.use("/api/v1/categories", router_4.default);
var port = process.env.PORT || 3333;
app.listen(port, function () {
    console.log("App is running on port " + port);
    database_1.default();
});
