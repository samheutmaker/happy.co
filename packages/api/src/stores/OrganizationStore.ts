import IOrganization from '@soundpack/models/.dist/interfaces/IOrganization';
import Organization from '../models/schemas/Organization';

export default class OrgStore {
  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      super('An error occured while processing the request.');
    }
  };

  public async create(attributes: IOrganization): Promise<IOrganization> {
    let org = new Organization(attributes);
    try {
      return await org.save();
    } catch (e) {
      console.error(e);
      return Promise.reject(new OrgStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async update(userId: string, org: IOrganization): Promise<IOrganization> {
    try {
      return await Organization.findOneAndUpdate(
      { 
        userId: userId,
        _id: org._id
      },
      { 
        $set: org 
      }, 
      { 
        new: true
      });
    } catch (e) {
      console.error(e);
      return Promise.reject(new OrgStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async list(userId: string): Promise<IOrganization[]> {
    try {
      return await Organization.find(userId ? { userId } : null);
    } catch (e) {
      console.error(e);
      return Promise.reject(new OrgStore.OPERATION_UNSUCCESSFUL());
    }
  }

  public async get(organizationId: string): Promise<IOrganization> {
    try {
      return await Organization.findById(organizationId);
    } catch (e) {
      console.error(e);
      return Promise.reject(new OrgStore.OPERATION_UNSUCCESSFUL());
    }
  }
  
  public async delete(userId: string, organizationId: string): Promise<boolean> {
    let org: IOrganization;
    try {
      org = await Organization.findOneAndUpdate(
        {
          userId: userId,
          _id: organizationId
        },
        {
          $set: {
            active: false,
          }
        },
        {
          new: true
        });
    } catch (e) {
      console.error(e);
      return Promise.reject(new OrgStore.OPERATION_UNSUCCESSFUL());
    }
    return !org.active;
  }
}
