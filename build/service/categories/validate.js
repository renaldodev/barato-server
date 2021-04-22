"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.addAndUpdateCategoriesValidationRules = void 0;
var express_validator_1 = require("express-validator");
exports.addAndUpdateCategoriesValidationRules = function () {
    return [
        express_validator_1.body('name', 'Name of categorie is required').notEmpty(),
        express_validator_1.body('description', 'Price decription is required').notEmpty(),
    ];
};
exports.validate = function (req, res, next) {
    var errors = express_validator_1.validationResult(req);
    if (errors.isEmpty()) {
        return next();
    }
    var extractedErrors = [];
    errors
        .array({ onlyFirstError: true })
        .map(function (err) {
        var _a;
        return extractedErrors.push((_a = {}, _a[err.param] = err.msg, _a));
    });
    return res.status(422).json({ errors: extractedErrors });
};
