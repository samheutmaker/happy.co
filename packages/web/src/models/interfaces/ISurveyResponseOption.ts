export default interface ISurveyResponseOption {
  text: string;
  value: string | number;
  maxValue?: number;
  minValue?: number;
  minLength?: number;
  maxLength?: number;
}
