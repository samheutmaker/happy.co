import ISurveyResponseOption from './ISurveyResponseOption';
import ESurveyStepType from '../enums/ESurveyStepType';

export default interface ISurveyStep {
  type: ESurveyStepType;
  name: string;
  text: string;
  durationInSeconds?: number;
  steps?: ISurveyStep[];
  options?: ISurveyResponseOption[];
}
