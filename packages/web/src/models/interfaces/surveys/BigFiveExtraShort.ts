import ISurvey, { ESurveyType } from '../ISurvey';
import ESurveyStepType from '../../enums/ESurveyStepType';

const Big5ExtraShortSurvey: ISurvey = {
  _id: '123455',
  type: ESurveyType.Big5ExtraShort,
  name: "Big 5 Extra Short",
  description: "A super short version of the Big 5 personality test",
  steps: [
    // {
    //   type: ESurveyStepType.AVRecording,
    //   name: "Video Recording",
    //   text:
    //     "We are going to take a 30 second audio and video recording before the test begins, during which you will be asked 5 questions. Answer the questions out loud. Stay centered in the video as best you can.",
    //   durationInSeconds: 30,
    //   steps: [
    //     // #1
    //     {
    //       type: ESurveyStepType.QAOutloud,
    //       name: "Question #1",
    //       text: "What is your full name?",
    //       durationInSeconds: 6,
    //     },
    //     // #2
    //     {
    //       type: ESurveyStepType.QAOutloud,
    //       name: "Question #2",
    //       text: "What is your date of birth?",
    //       durationInSeconds: 6,
    //     },
    //     // #3
    //     {
    //       type: ESurveyStepType.QAOutloud,
    //       name: "Question #3",
    //       text: "What is your favorite food?",
    //       durationInSeconds: 6,
    //     },
    //     // #4
    //     {
    //       type: ESurveyStepType.QAOutloud,
    //       name: "Question #4",
    //       text: "What is your favorite color?",
    //       durationInSeconds: 6,
    //     },
    //     // #5
    //     {
    //       type: ESurveyStepType.QAOutloud,
    //       name: "Question #5",
    //       text: "What country do you live in?",
    //       durationInSeconds: 6,
    //     },
    //   ],
    // },
    // // Next Button
    // {
    //   type: ESurveyStepType.InstructionsWithNextButton,
    //   name: "Start Test Intro",
    //   text: "Great! You are ready to begin the final step.",
    // },
    // Question #1
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #1",
      text: "I see myself as someone who is reserved.",
      options: [
        {
          text: "Disagree strongly",
          value: 1,
        },
        {
          text: "Disagree a little",
          value: 2,
        },
        {
          text: "Neither agree nor disagree",
          value: 3,
        },
        {
          text: "Agree a little",
          value: 4,
        },
        {
          text: "Agree strongly",
          value: 5,
        },
      ],
    },
    // Question #2
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #2",
      text: "I see myself as someone who is generally trusting.",
      options: [
        {
          text: "Disagree strongly",
          value: 1,
        },
        {
          text: "Disagree a little",
          value: 2,
        },
        {
          text: "Neither agree nor disagree",
          value: 3,
        },
        {
          text: "Agree a little",
          value: 4,
        },
        {
          text: "Agree strongly",
          value: 5,
        },
      ],
    },
    // Question #3
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #3",
      text: "I see myself as someone who is tends to be lazy.",
      options: [
        {
          text: "Disagree strongly",
          value: 1,
        },
        {
          text: "Disagree a little",
          value: 2,
        },
        {
          text: "Neither agree nor disagree",
          value: 3,
        },
        {
          text: "Agree a little",
          value: 4,
        },
        {
          text: "Agree strongly",
          value: 5,
        },
      ],
    },
    // Question #4
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #4",
      text: "I see myself as someone who is relaxed, handles stress well.",
      options: [
        {
          text: "Disagree strongly",
          value: 1,
        },
        {
          text: "Disagree a little",
          value: 2,
        },
        {
          text: "Neither agree nor disagree",
          value: 3,
        },
        {
          text: "Agree a little",
          value: 4,
        },
        {
          text: "Agree strongly",
          value: 5,
        },
      ],
    },
    // Question #5
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #5",
      text: "I see myself as someone who has few artistic interests.",
      options: [
        {
          text: "Disagree strongly",
          value: 1,
        },
        {
          text: "Disagree a little",
          value: 2,
        },
        {
          text: "Neither agree nor disagree",
          value: 3,
        },
        {
          text: "Agree a little",
          value: 4,
        },
        {
          text: "Agree strongly",
          value: 5,
        },
      ],
    },
    // Question #6
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #6",
      text: "I see myself as someone who is outgoing, sociable.",
      options: [
        {
          text: "Disagree strongly",
          value: 1,
        },
        {
          text: "Disagree a little",
          value: 2,
        },
        {
          text: "Neither agree nor disagree",
          value: 3,
        },
        {
          text: "Agree a little",
          value: 4,
        },
        {
          text: "Agree strongly",
          value: 5,
        },
      ],
    },
    // Question #7
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #7",
      text: "I see myself as someone who tends to find fault with others.",
      options: [
        {
          text: "Disagree strongly",
          value: 1,
        },
        {
          text: "Disagree a little",
          value: 2,
        },
        {
          text: "Neither agree nor disagree",
          value: 3,
        },
        {
          text: "Agree a little",
          value: 4,
        },
        {
          text: "Agree strongly",
          value: 5,
        },
      ],
    },
    // Question #8
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #8",
      text: "I see myself as someone who does a thorough job.",
      options: [
        {
          text: "Disagree strongly",
          value: 1,
        },
        {
          text: "Disagree a little",
          value: 2,
        },
        {
          text: "Neither agree nor disagree",
          value: 3,
        },
        {
          text: "Agree a little",
          value: 4,
        },
        {
          text: "Agree strongly",
          value: 5,
        },
      ],
    },
    // Question #9
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #9",
      text: "I see myself as someone who gets nervous easily.",
      options: [
        {
          text: "Disagree strongly",
          value: 1,
        },
        {
          text: "Disagree a little",
          value: 2,
        },
        {
          text: "Neither agree nor disagree",
          value: 3,
        },
        {
          text: "Agree a little",
          value: 4,
        },
        {
          text: "Agree strongly",
          value: 5,
        },
      ],
    },
    // Question #10
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #10",
      text: "I see myself as someone who has an active imagination.",
      options: [
        {
          text: "Disagree strongly",
          value: 1,
        },
        {
          text: "Disagree a little",
          value: 2,
        },
        {
          text: "Neither agree nor disagree",
          value: 3,
        },
        {
          text: "Agree a little",
          value: 4,
        },
        {
          text: "Agree strongly",
          value: 5,
        },
      ],
    },
  ],
};

export default Big5ExtraShortSurvey;
