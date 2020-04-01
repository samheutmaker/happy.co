import IUser from '@soundpack/models/.dist/interfaces/IUser';
import StatusCodeEnum from '../../models/enums/StatusCodeEnum';
import {
  ApolloError,
  AuthenticationError,
} from 'apollo-server-express';
import controller from '../../controllers/controller';
import {
  IUpdateOrgRequest,
  IUpdateOrgResponse,
  IGetOrgRequest,
  IGetOrgResponse,
  IDeleteOrgRequest,
  IDeleteOrgResponse,
} from '../../models/interfaces/IOrganizationAPI';

export default {
  Query: { 
    async org(parent, args, context) {
      const { req: { user } }: { req: { user: IUser } } = context;

      const request: IGetOrgRequest = {
        auth: {
          userId: user._id,
          organizationId: user.organizationId,
        },
        organizationId: args.organizationId,
      }

      let response: IGetOrgResponse;

      try {
        response = await controller.org.get(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, response.status.toString());
        }

      } catch (e) {
        throw e;
      }

      return response.organization;
    },
  },
  Mutation: {
    async updateOrg(parent, args, context) {
      const { req: { user } }: { req: { user: IUser } } = context;

      if (!user._id) {
        throw new AuthenticationError("Authentication Required.");
      }

      if(!user.organizationId) {
        throw new AuthenticationError("Authorization Required."); 
      }

      const request: IUpdateOrgRequest = {
        auth: {
          userId: user._id,
          organizationId: user.organizationId,
        },
        organization: args.org,
      }

      let response: IUpdateOrgResponse;

      try {
        response = await controller.org.update(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, response.status.toString());
        }

      } catch (e) {
        throw e;
      }

      return response.organization;
    },
    async deleteOrg(parent, args, context) {
      const { req: { user } }: { req: { user: IUser } } = context;

      if (!user._id) {
        throw new AuthenticationError("Authentication Required.");
      }

      if (!user.organizationId) {
        throw new AuthenticationError("Authorization Required.");
      }

      const request: IDeleteOrgRequest = {
        auth: {
          userId: user._id,
          organizationId: user.organizationId,
        },
        organizationId: args.organizationId,
      }

      let response: IDeleteOrgResponse;

      try {
        response = await controller.org.delete(request);

        if (response.status !== StatusCodeEnum.OK) {
          throw new ApolloError(response.error.message, response.status.toString());
        }

      } catch (e) {
        throw e;
      }

      return response.deleted;
    },
  }
};
