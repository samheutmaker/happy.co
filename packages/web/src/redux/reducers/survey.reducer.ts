import Partial from "../../models/interfaces/Partial";
import {
  SurveyActionTypes,
  SurveyActionCreatorTypes,
  CreateSurveyResponseAction,
  BeginSurveyResponseAction,
} from "../actions/survey.actions";
import ISurvey from '../../models/interfaces/ISurvey';
import ISurveyResponse from '../../models/interfaces/ISurveyResponse';
import ISurveyStep from "../../models/interfaces/ISurveyStep";


function surveyResponseState(survey: ISurvey, userId: string): ISurveyResponse {
  return {
    type: survey.type,
    userId: userId,
    surveyId: survey._id as string,
    responses: [],
  };
};

type SurveyReducerState = {
  surveyResponse: ISurveyResponse | null;
  currentStepIndex: number[];
  startTime: number | null;
};

function surveyReducerState(): SurveyReducerState {
  return {
    surveyResponse: null,
    currentStepIndex: [],
    startTime: null,
  };
}

export default function reducer(
  state = surveyReducerState(),
  action: SurveyActionCreatorTypes
) {
  const { type, payload } = action;

  switch (type) {
    case SurveyActionTypes.CREATE_SURVEY_RESPONSE:
      return createSurveyResponse(
        state,
        payload as CreateSurveyResponseAction["payload"]
      );

    case SurveyActionTypes.BEGIN_SURVEY_RESPONSE:
      return beginSurveyResponse(
        state,
        payload as BeginSurveyResponseAction["payload"]
      );

    default:
      return state;
  }
}

/****************************************************************************************
  Survey Response
****************************************************************************************/

function createSurveyResponse(
  state: SurveyReducerState,
  payload: {
    survey: ISurvey,
    userId: string,
  }
): SurveyReducerState {
  return {
    ...state,
    surveyResponse: surveyResponseState(
      payload.survey, 
      payload.userId
    )
  };
}

function beginSurveyResponse(
  state: SurveyReducerState,
  payload: {
    survey: ISurvey,
  }
): SurveyReducerState {
  
  const currentStepIndex = getNextStepIndex(payload.survey.steps, [0, 10]);
  // console.log(currentStepIndex);
  return {
    ...state,
    currentStepIndex,
    startTime: Date.now(),

  };
}


function getStep(steps: ISurveyStep[], coordinates: number[]): ISurveyStep | undefined {
  let currentSteps: ISurveyStep[] = steps;
  let currentStep: ISurveyStep | undefined;

  while(coordinates.length) {
    let currentIndex = coordinates.shift() as number;
    currentStep = currentSteps[currentIndex]

    if(coordinates.length === 0) return currentStep;

    if (!currentStep.steps) {
      return undefined;
    }
  
    currentSteps = currentStep.steps;
  }

  return currentStep;
}


function getNextStepIndex(steps: ISurveyStep[], currentStepIndex: number[]): number[] {
  

  console.log(getStep(steps, [1, 0]));
  return [...currentStepIndex];
}