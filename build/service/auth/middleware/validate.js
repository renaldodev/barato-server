"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = exports.signinValidationRules = exports.signupValidationRules = void 0;
var express_validator_1 = require("express-validator");
exports.signupValidationRules = function () {
    return [
        express_validator_1.body('name', 'Name is required').notEmpty(),
        express_validator_1.body('email', 'Invalid email').notEmpty().isEmail().normalizeEmail(),
        express_validator_1.body('auth_type', 'Auth type is required').notEmpty(),
        express_validator_1.body('password', 'Password is required (min 5 characters)')
            .if(express_validator_1.body('auth_type').equals('email'))
            .notEmpty()
            .isLength({ min: 5 }),
    ];
};
exports.signinValidationRules = function () {
    return [
        express_validator_1.body('name', 'Name is required')
            .if(express_validator_1.body('auth_type').not().equals('email'))
            .notEmpty(),
        express_validator_1.body('email', 'Invalid email').not().isEmpty().isEmail().normalizeEmail(),
        express_validator_1.body('auth_type', 'Auth type is required').notEmpty(),
        express_validator_1.body('password', 'Password is required (min 5 characters)')
            .if(express_validator_1.body('auth_type').equals('email'))
            .notEmpty()
            .isLength({ min: 5 }),
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
