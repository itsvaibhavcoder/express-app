"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = require("@hapi/joi");
var mongoose_1 = require("mongoose");
var NoteValidator = /** @class */ (function () {
    function NoteValidator() {
        this.validate_note = function (req, res, next) {
            var schema = joi_1.default.object({
                Title: joi_1.default.string().min(4),
                Description: joi_1.default.string().min(8),
                color: joi_1.default.string().min(2),
                isArchived: joi_1.default.boolean(),
                isDeleted: joi_1.default.boolean(),
                UserID: joi_1.default.string().min(4)
            });
            var error = schema.validate(req.body).error;
            if (error) {
                throw Error('Error' + error.message);
            }
            next();
        };
        //Middleware to validate the id
        this.validateIdMiddleware = function (req, res, next) {
            var schema = joi_1.default.object({
                id: joi_1.default.string().custom(function (value, helpers) {
                    if (!mongoose_1.default.Types.ObjectId.isValid(value)) {
                        return helpers.error('any.invalid');
                    }
                    return value;
                })
                    .required()
            });
            var error = schema.validate({ id: req.params.id }).error;
            if (error) {
                return res.status(400).send({ error: error.details[0].message });
            }
            next();
        };
    }
    return NoteValidator;
}());
exports.default = NoteValidator;
