import Partial from "../../models/interfaces/Partial";
import {
  SurveyActionTypes,
  SurveyActionCreatorTypes,
  CreateSurveyResponseAction,
  BeginSurveyResponseAction,
  CreateSurveyStepResponseAction,
  GoToSurveyNextStepAction,
} from "../actions/survey.actions";
import ISurvey from '../../models/interfaces/ISurvey';
import ISurveyResponse from '../../models/interfaces/ISurveyResponse';
import ISurveyStep from "../../models/interfaces/ISurveyStep";
import ISurveyStepResponse from "../../models/interfaces/ISurveyStepResponse";
import ISurveyStepAnswer from "../../models/interfaces/ISurveyStepAnswer";
import SurveyUtil from '../../utils/SurveyUtil';


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
  currentStepCoordinates: number[];
  startTime: number | null;
};

function surveyReducerState(): SurveyReducerState {
  return {
    surveyResponse: null,
    currentStepCoordinates: [],
    startTime: null,
  };
}

export default function reducer(
  state = surveyReducerState(),
  action: SurveyActionCreatorTypes
) {
  const { type, payload } = action;

  switch (type) {
    // Survey Response
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
    
    // Survey Step Response
    case SurveyActionTypes.CREATE_SURVEY_STEP_RESPONSE:
      return createSurveyStepResponse(
        state,
        payload as CreateSurveyStepResponseAction["payload"]
      );

    case SurveyActionTypes.GO_TO_SURVEY_NEXT_STEP:
        return goToSurveyNextStep(
          state,
          payload as GoToSurveyNextStepAction["payload"]
        )

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
      payload.userId,
    ),
  };
}

function beginSurveyResponse(
  state: SurveyReducerState,
  payload: {
    survey: ISurvey,
  }
): SurveyReducerState {
  return state;
}

function goToSurveyNextStep(
  state: SurveyReducerState,
  payload: {
    survey: ISurvey,
  }
): SurveyReducerState {

  let newState = {
    ...state,
  };

  newState.currentStepCoordinates = [...getNextStepCoordinates(
    payload.survey.steps,
    newState.currentStepCoordinates
  )];

  return newState;
}

function getNextStepCoordinates(steps: ISurveyStep[], currentStepCoordinates: number[]): number[] {
  let currentLevel = currentStepCoordinates.length - 1;
  
  while(currentLevel > -1) {
    currentStepCoordinates[currentLevel] = currentStepCoordinates[currentLevel] + 1;
    let nextStep = SurveyUtil.getStep(steps, currentStepCoordinates);
    if(nextStep) {
      break;
    } else {
      currentStepCoordinates.splice(currentLevel);
      currentLevel--;
    }
  }
  return currentStepCoordinates;
}

/****************************************************************************************
  Survey Step Response
****************************************************************************************/

function createSurveyStepResponse(
  state: SurveyReducerState,
  payload: {
    step: ISurveyStep,
    answers: ISurveyStepAnswer[]
  }
): SurveyReducerState {
  const response: ISurveyStepResponse = {
    type: payload.step.type,
    name: payload.step.name,
    text: payload.step.text,
    answers: payload.answers,
  };

  const path = state.currentStepCoordinates.reduce((cur, next) => {
    console.log(next);
    return cur + `responses/${next}`;
  }, '');


  let newState = {...state};

  setValue(newState.surveyResponse, path, response);

  console.log(newState.surveyResponse);

  return newState;
}


function setValue(obj: any, path: string, value: any) {
  var a = path.split('.')
  var o = obj
  while (a.length - 1) {
    var n = a.shift() as any;
    if (!(n in o)) o[n] = {}
    o = o[n]
  }
  o[a[0]] = value
}