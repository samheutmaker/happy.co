import ISurveyStep from './ISurveyStep';

export enum ESurveyType {
  Big5ExtraShort = 'Big 5 Extra Short',
}

export default interface ISurvey {
  _id?: string;
  type: ESurveyType;
  name: string;
  description: string;
  steps: ISurveyStep[];
}
