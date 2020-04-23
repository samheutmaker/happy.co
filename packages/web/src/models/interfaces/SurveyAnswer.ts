export interface SurveyAnswerOption {
  text: string;
  value: string | number;
  maxValue?: number;
  minValue?: number;
  minLength?: number;
  maxLength?: number;
}

export default interface SurveryAnswer {
  options: SurveyAnswerOption[];
}
