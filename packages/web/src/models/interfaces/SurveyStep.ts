import SurveryAnswer from './SurveyAnswer';

export enum ESurveyStepType {
  AVRecording = 'Audio/Video Recording',
  QAOutloud = 'Question/Answer Outloud',
  InstructionsWithNextButton = 'Instructions With Next Button',
  MultipleChoiceQuestion = 'Multiple Choice Question',
}

export default interface SurveyStep {
  type: ESurveyStepType;
  name: string;
  text: string;
  durationInSeconds?: number;
  steps?: SurveyStep[];
  answer?: SurveryAnswer;
}
