import Joi from 'joi';
import bcrypt from 'bcrypt';
import { UpdateWriteOpResult } from 'mongodb';
import { Document, Schema, Model, model } from 'mongoose';
import IUser from '@soundpack/models/.dist/interfaces/IUser';
import UserMongo from '@soundpack/models/.dist/mongo/User.mongo';

export interface IUserModel extends IUser, Document {
  _id: string,
}
export const UserSchema = new Schema(UserMongo);
export const User: Model<IUserModel> = model<IUserModel>('User', UserSchema);

export default class UserStore {
  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      super('An error occured while processing the request.');
    }
  };

  public async createUser(attributes: IUser): Promise<IUser> {
    try {
      attributes.passwordHash = await this.hashPassword(attributes.password);
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    } 

    delete attributes.password;

    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.any().forbidden(),
      passwordHash: Joi.string().required(),
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      phoneNumber: Joi.string().optional(),
      createdAt: Joi.number().required(),
      organizationId: Joi.string().allow(null),
    });

    const params = Joi.validate(attributes, schema);
    const { 
      email, 
      passwordHash, 
      firstName, 
      lastName, 
      phoneNumber, 
      organizationId,
      createdAt 
    } = params.value;

    if (params.error) {
      return Promise.reject(params.error);
    }

    const newUserFields = {
      email,
      passwordHash,
      firstName,
      lastName,
      phoneNumber,
      organizationId,
      createdAt
    };

    let savedUser: IUser;

    const user = new User(newUserFields);

    try {
      savedUser = await user.save();
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }

    return savedUser;
  }
  public async setOrganizationId(userId: string, organizationId: string): Promise<IUser> {
    let user: IUser;
    try {
      user = await User.findOneAndUpdate({ _id: userId }, { $set: { organizationId } }, { new: true });
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }
    return user;
  }
  public async saveEmailVerifyCode(userId: string, emailVerifyCode: string): Promise<boolean> {
    let put: UpdateWriteOpResult["result"];

    try {
      put = await User.updateOne({ _id: userId }, { $set: { emailVerifyCode } });
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }

    return put.nModified === 1;
  }
  public async verifyEmail(emailVerifyCode: string): Promise<boolean> {
    let put: UpdateWriteOpResult['result'];

    try {
      put = await User.updateOne({ emailVerifyCode }, { $set: { emailVerifiedAt: Date.now() }});
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }

    return put.nModified === 1;
  }
  public async verifyPhoneNumber(userId: string): Promise<boolean> {
    let put: UpdateWriteOpResult['result'];

    try {
      put = await User.updateOne({ _id: userId }, { $set: { phoneNumberVerifiedAt: Date.now() } });
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }

    return put.nModified === 1;
  }
  private async hashPassword(password: string): Promise<string> {
    try {
      Joi.assert(password, Joi.string().required());
    } catch (e) {
      return Promise.reject(e);
    }

    const stretches = 10;
    const hash = await bcrypt.hash(password, stretches);

    return hash;
  }
  public async comparePasswordHash(password: string, passwordHash: string): Promise<boolean> {
    let isValid: boolean;
    try {
      isValid = await bcrypt.compare(password, passwordHash);
    } catch(e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }

    return isValid;
  }
  public async forgotPassword(email: string, forgotPasswordCode: string): Promise<IUser> {
    let user: IUser;
    try {
      user = await User.findOneAndUpdate({ email }, { $set: { forgotPasswordCode } }, { new: true });
      // user = await User.updateOne({ email }, { $set: { forgotPasswordCode } }, {new: true});
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }
    return user;
  }
  public async resetPassword(forgotPasswordCode: string, newPassword: string): Promise<boolean> {
    let put: UpdateWriteOpResult['result'];
    let passwordHash;

    try {
      passwordHash = await this.hashPassword(newPassword);
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    } 
    
    try {
      put = await User.updateOne({ forgotPasswordCode }, { $set: { passwordHash, lastChangedPasswordAt: Date.now() }});
    } catch(e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }

    return put.nModified ===1;
  }
  public async get(userId: string): Promise<IUser> {
    let user: IUser;
    try {
      user = await User.findById(userId);
    } catch(e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }

    return user;
  }
  public async findByEmail(email: string): Promise<IUser> {
    let user: IUser;
    try {
      user = await User.findOne({ email });
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }
    
    return user
  }

}
