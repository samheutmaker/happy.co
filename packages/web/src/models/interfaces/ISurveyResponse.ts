import { ESurveyType } from './ISurvey';
import { ESurveyStepType } from './ISurveyStep';

enum ESurveyStepAnswerType {
  Text = 'Text',
  Number = 'Number',
  File = 'File',
  FileUrl = 'FileUrl',
}

interface ISurveryStepAnswer {
  type: ESurveyStepAnswerType;
  text?: string;
  value?: number | string | File;
}

interface ISurveyStepResponse {
  type: ESurveyStepType;
  name?: string;
  text?: string;
  startedAt?: number;
  endedAt?: number;
  answers?: ISurveryStepAnswer[];
  responses?: ISurveyStepResponse[];
}

export default interface ISurveyResponse {
  type: ESurveyType;
  userId: string;
  surveyId: string;
  responses: ISurveyStepResponse[];
}

const response: ISurveyResponse = {
  type: ESurveyType.Big5ExtraShort,
  userId: "123",
  surveyId: "123",
  responses: [
    {
      type: ESurveyStepType.AVRecording,
      name: "Video Recording",
      text:
        "We are going to take a 30 second audio and video recording before the test begins, during which you will be asked 5 questions. Answer the questions out loud. Stay centered in the video as best you can.",
      startedAt: 30,
      endedAt: 10,
      answers: [
        {
          type: ESurveyStepAnswerType.File,
          value: "google storage link",
        },
      ],
      responses: [
        // #1
        {
          type: ESurveyStepType.QAOutloud,
          name: "Question #1",
          text: "What is your full name?",
          startedAt: 6,
          endedAt: 10,
          answers: [
            {
              type: ESurveyStepAnswerType.File,
              value: "google storage link",
            },
          ],
        },
        // #2
        {
          type: ESurveyStepType.QAOutloud,
          name: "Question #2",
          text: "What is your date of birth?",
          startedAt: 6,
          endedAt: 10,
          answers: [
            {
              type: ESurveyStepAnswerType.File,
              value: "google storage link",
            },
          ],
        },
        // #3
        {
          type: ESurveyStepType.QAOutloud,
          name: "Question #3",
          text: "What is your favoriate food?",
          startedAt: 6,
          endedAt: 10,
          answers: [
            {
              type: ESurveyStepAnswerType.File,
              value: "google storage link",
            },
          ],
        },
        // #4
        {
          type: ESurveyStepType.QAOutloud,
          name: "Question #4",
          text: "What is your favorite color?",
          startedAt: 6,
          endedAt: 10,
          answers: [
            {
              type: ESurveyStepAnswerType.File,
              value: "google storage link",
            },
          ],
        },
        // #5
        {
          type: ESurveyStepType.QAOutloud,
          name: "Question #5",
          text: "What country do you live in?",
          startedAt: 6,
          endedAt: 10,
          answers: [
            {
              type: ESurveyStepAnswerType.File,
              value: "google storage link",
            },
          ],
        },
      ],
    },
    // Next Button
    {
      type: ESurveyStepType.InstructionsWithNextButton,
      name: "Start Test Intro",
      text: "Great! You are ready to begin the final step.",
      startedAt: 10,
      endedAt: 10,
    },
    // Question #1
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #1",
      text: "I see myself as someone who is reserved.",
      answers: [
        {
          type: ESurveyStepAnswerType.Number,
          text: "Disagree strongly",
          value: 1,
        },
      ],
    },
    // Question #2
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #2",
      text: "I see myself as someone who is generally trusting.",
      answers: [
        {
          type: ESurveyStepAnswerType.Number,
          text: "Disagree a little",
          value: 2,
        },
      ],
    },
    // Question #3
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #3",
      text: "I see myself as someone who is tends to be lazy.",
      answers: [
        {
          type: ESurveyStepAnswerType.Number,
          text: "Disagree a little",
          value: 2,
        },
      ],
    },
    // Question #4
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #4",
      text: "I see myself as someone who is relaxed, handles stress well.",
      answers: [
        {
          type: ESurveyStepAnswerType.Number,
          text: "Disagree a little",
          value: 2,
        },
      ],
    },
    // Question #5
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #5",
      text: "I see myself as someone who has few artistic interests.",
      answers: [
        {
          type: ESurveyStepAnswerType.Number,
          text: "Disagree a little",
          value: 2,
        },
      ],
    },
    // Question #6
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #6",
      text: "I see myself as someone who is outgoing, sociable.",
      answers: [
        {
          type: ESurveyStepAnswerType.Number,
          text: "Disagree a little",
          value: 2,
        },
      ],
    },
    // Question #7
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #7",
      text: "I see myself as someone who tends to find fault with others.",
      answers: [
        {
          type: ESurveyStepAnswerType.Number,
          text: "Disagree a little",
          value: 2,
        },
      ],
    },
    // Question #8
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #8",
      text: "I see myself as someone who does a thorough job.",
      answers: [
        {
          type: ESurveyStepAnswerType.Number,
          text: "Disagree a little",
          value: 2,
        },
      ],
    },
    // Question #9
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #9",
      text: "I see myself as someone who gets nervous easily.",
      answers: [
        {
          type: ESurveyStepAnswerType.Number,
          text: "Disagree a little",
          value: 2,
        },
      ],
    },
    // Question #10
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #10",
      text: "I see myself as someone who has an active imagination.",
      answers: [
        {
          type: ESurveyStepAnswerType.Number,
          text: "Disagree a little",
          value: 2,
        },
      ],
    },
  ],
};