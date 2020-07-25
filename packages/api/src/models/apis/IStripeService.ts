import IUser from '@soundpack/models/.dist/interfaces/IUser';
import {
  IRequest,
  IResponse,
  IAuthenticatedRequest,
} from '../interfaces/common';

export default interface IStripeService {
  createCustomer(request: ICreateCustomerRequest): Promise<ICreateCustomerResponse>
}

/********************************************************************************
*  Customer
********************************************************************************/

export interface ICreateCustomerRequest extends IRequest {
  userId: string;
}

export interface ICreateCustomerResponse extends IResponse {
  stripeCustomerId?: string;
}
