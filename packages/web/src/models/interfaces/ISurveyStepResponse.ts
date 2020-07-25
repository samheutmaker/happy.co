import ISurveyStepAnswer from './ISurveyStepAnswer';
import ESurveyStepType from '../enums/ESurveyStepType';

export default interface ISurveyStepResponse {
  type: ESurveyStepType;
  name?: string;
  text?: string;
  startedAt?: number;
  endedAt?: number;
  answers?: ISurveyStepAnswer[];
  responses?: ISurveyStepResponse[];
}
