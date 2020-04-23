import SurveyStep from './SurveyStep';

export enum ESurveyType {
  Big5ExtraShort = 'Big 5 Extra Short',
}

export default interface Survey {
  type: ESurveyType;
  name: string;
  description: string;
  steps: SurveyStep[];
}
