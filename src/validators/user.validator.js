"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("@hapi/joi");
var UserValidator = /** @class */ (function () {
    function UserValidator() {
        this.signUpValidate = function (req, res, next) {
            var schema = joi_1.default.object({
                firstName: joi_1.default.string().min(4).pattern(/^[A-Za-z]+$/).required(),
                lastName: joi_1.default.string().min(4).pattern(/^[A-Za-z]+$/)
                    .required(),
                email: joi_1.default.string().email().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
                password: joi_1.default.string().min(8).pattern(/^\S+$/)
                    .required()
            });
            var error = schema.validate(req.body).error;
            if (error) {
                next(error);
            }
            next();
        };
        this.loginValidate = function (req, res, next) {
            var schema = joi_1.default.object({
                email: joi_1.default.string().email().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
                password: joi_1.default.string().min(8).pattern(/^\S+$/).required()
            });
            var error = schema.validate(req.body).error;
            if (error) {
                next(error);
            }
            next();
        };
        this.emailValidate = function (req, res, next) {
            var schema = joi_1.default.object({
                email: joi_1.default.string().email().pattern(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).required(),
            });
            var error = schema.validate(req.body).error;
            if (error) {
                next(error);
            }
            next();
        };
        this.resetPasswordValidate = function (req, res, next) {
            var schema = joi_1.default.object({
                token: joi_1.default.string().required(),
                newPassword: joi_1.default.string().min(8).pattern(/^\S+$/).required(),
            });
            var error = schema.validate(req.body).error;
            if (error) {
                next(error);
            }
            next();
        };
    }
    return UserValidator;
}());
exports.default = UserValidator;
