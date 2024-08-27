import Joi from '@hapi/joi';
import { Request, Response, NextFunction } from 'express';

class UserValidator {
  public signUp = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      firstName: Joi.string().min(5).required(),
      lastName: Joi.string().min(5).required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(5).required(),
    });

    const { error } = schema.validate(req.body);
    if (error) {
      return next(error); 
    }
    next(); 
  };

  public emailValidate = (req: Request, res: Response, next: NextFunction): void => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(), 
    });

    const { error } = schema.validate(req.body);
    if (error) {
      console.log("Validation Error:", error.details);
      return next(error); 
    }
    next(); 
  };
}

export default UserValidator;
