import ESurveyStepAnswerType from './../enums/ESurveyStepAnswerType';

export default interface ISurveyStepAnswer {
  type: ESurveyStepAnswerType;
  text?: string;
  value?: number | string | File;
}
