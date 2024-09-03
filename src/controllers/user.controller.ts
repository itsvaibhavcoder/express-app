import HttpStatus from 'http-status-codes';
import userService from '../services/user.service';
import { Request, Response, NextFunction } from 'express';

class UserController {
  public UserService = new userService();

  public signUp = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const _ = await this.UserService.signUp(req.body);
      const {password, ...rest_data} = req.body;
      res.status(HttpStatus.CREATED).json({
        code: HttpStatus.CREATED,
        data: rest_data,
        message: 'User Registered'
      }); //next();
    
    } 
    catch (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: "",
        message: error.message
      });
    }
  };

  public login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.UserService.MatchCredential(req.body.email, req.body.password);
      if(user){
        console.log("User-->", user);
        const generate_Token = await this.UserService.generateToken({
          UserID: user._id,
          email: user.email
        });
        const {firstName, email, ...rest_data} = user;
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK ,
          data: {
            firstName,
            email,
            generate_Token
          },
          message: 'User logged In'
        });
      } 
      else {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: "",
          message: 'Invalid Email or Password.'
        });
      }
    }
    catch(error){
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        data: "",
        message: 'Invalid Email or Password.'
      });
     }
    }

    public forgetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const resetToken = await this.UserService.generatePasswordResetToken(req.body.email);
        // Send the token via email or return it in the response
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: { resetToken },
          message: 'Password reset token generated',
        });
      } 
      catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: "",
          message: error.message,
        });
      }
    };
   
    public resetPassword = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        const { token, newPassword } = req.body;
        await this.UserService.resetPassword(token, newPassword);
        res.status(HttpStatus.OK).json({
          code: HttpStatus.OK,
          data: "",
          message: 'Password reset successful',
        });
      } catch (error) {
        res.status(HttpStatus.BAD_REQUEST).json({
          code: HttpStatus.BAD_REQUEST,
          data: "",
          message: error.message,
        });
      }
    };
};

export default UserController;

