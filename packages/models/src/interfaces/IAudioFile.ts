import IMetaData from './IMetaData';
``
export default interface IAudioFile {
  _id: string;
  organizationId: string;
  projectId: string;
  active: boolean;
  name: string;
  description: string;
  audioUrl?: string;
  textUrl?: string;
  text?: string;
  cost?: number;
  meta?: IMetaData;
}
