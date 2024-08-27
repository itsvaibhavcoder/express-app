import User from '../models/User';
import { IUser } from '../interfaces/user.interface';
import bcrypt from 'bcryptjs';

class UserService {
  // Create new user
  public signUp = async (userDetails: IUser): Promise<IUser | { message: string }> => {
    try {
      if (userDetails) {
        const hashedPassword = await bcrypt.hash(userDetails.password, 10);
        userDetails.password = hashedPassword;
        const data = await User.create(userDetails);
        return data as IUser;
      } else {
        return {
          message: 'Invalid details entered',
        };
      }
    } catch (error) {
      return {
        message: 'Error creating user: ' + error.message,
      };
    }
  };

  // Login user
  public userLogin = async (userDetails: { email: string; password: string }): Promise<IUser | { message: string }> => {
    try {
      const user = await User.findOne({ email: userDetails.email });

      if (!user) {
        return {
          message: 'User not found',
        };
      }

      const isPasswordValid = await bcrypt.compare(userDetails.password, user.password);

      if (!isPasswordValid) {
        return {
          message: 'Invalid password',
        };
      }

      return user as IUser; 
    } catch (error) {
      return {
        message: 'Error logging in: ' + error.message,
      };
    }
  };
}

export default UserService;
