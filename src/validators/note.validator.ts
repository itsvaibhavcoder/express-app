import Joi from "@hapi/joi";
import { Request, Response, NextFunction } from "express";

class NoteValidator {
    public validate_note = (req: Request, res: Response, next: NextFunction): void => {
        const schema = Joi.object({
            Title: Joi.string().min(4),
            Description: Joi.string().min(8),
            color: Joi.string().min(2),
            isArchived: Joi.boolean(),
            isDeleted: Joi.boolean(),
            UserID: Joi.string().min(4)
        });
        const {error} = schema.validate(req.body);
        if(error){
            throw Error("Error"+ error.message);
        }
        next();
    };
}

export default NoteValidator;