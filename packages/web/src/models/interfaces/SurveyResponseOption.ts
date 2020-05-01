export default interface SurveyResponseOption {
  text: string;
  value: string | number;
  maxValue?: number;
  minValue?: number;
  minLength?: number;
  maxLength?: number;
}
