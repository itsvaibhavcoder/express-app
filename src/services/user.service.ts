import User from '../models/user.model';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class UserService {

  //create new user
  public signUp = async (body: IUser): Promise<IUser> => {
    const existingUser = await User.findOne({ email: body.email });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const data = await User.create(body);
    return data;
  };
  
  public MatchCredential = async (email: string, password: string): Promise<any> => {
    const user = (await User.findOne({email}).exec());
    if(user){
      const validate = await bcrypt.compare(password, user.password);
      if (validate){
        return user;
      }
      return false;
    }
    return false;
  };

  public generateToken = async(payload: {UserID: String, email: String}): Promise<String> => {
    const secretKey = process.env.JWT_SECRET_KEY
    const token = jwt.sign(payload, secretKey, {expiresIn: '1h'});
    return token 
  }

  public generatePasswordResetToken = async (email: string): Promise<string> => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Email does not exist');
    }

    // Generate a password reset token (you can use JWT or a simple token generator)
    const resetToken = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: '15m' });

    // Save the token to the user document (optional)
    //user.passwordResetToken = resetToken;
    await user.save();

    return resetToken;
  };

  public resetPassword = async (token: string, newPassword: string): Promise<void> => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY) as { email: string };
      const user = await User.findOne({ email: decoded.email });
      if (!user) {
        throw new Error('Invalid token or user does not exist');
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      //user.passwordResetToken = undefined; // Optionally clear the reset token
      await user.save();
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  };


  
};

export default UserService;
