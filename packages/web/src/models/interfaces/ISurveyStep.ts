import ISurveyResponseOption from './ISurveyResponseOption';

export enum ESurveyStepType {
  AVRecording = 'Audio/Video Recording',
  QAOutloud = 'Question/Answer Outloud',
  InstructionsWithNextButton = 'Instructions With Next Button',
  MultipleChoiceQuestion = 'Multiple Choice Question',
}

export default interface ISurveyStep {
  type: ESurveyStepType;
  name: string;
  text: string;
  durationInSeconds?: number;
  steps?: ISurveyStep[];
  options?: ISurveyResponseOption[];
}
