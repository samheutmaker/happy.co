import Partial from "../../models/interfaces/Partial";
import ISurvey from '../../models/interfaces/ISurvey';
import ISurveyResponse from '../../models/interfaces/ISurveyResponse';
import ISurveyStep from "../../models/interfaces/ISurveyStep";
import ISurveyStepResponse from '../../models/interfaces/ISurveyStepResponse';
import ISurveyStepAnswer from "../../models/interfaces/ISurveyStepAnswer";

export const SurveyActionTypes = {
  CREATE_SURVEY_RESPONSE: "CREATE_SURVEY_RESPONSE",
  BEGIN_SURVEY_RESPONSE: "BEGIN_SURVEY_RESPONSE",
  CREATE_SURVEY_STEP_RESPONSE: "CREATE_SURVEY_STEP_RESPONSE",
  GO_TO_SURVEY_NEXT_STEP: "GO_TO_SURVEY_NEXT_STEP",
};

/****************************************************************************************
  Create Survey Response
****************************************************************************************/

export interface CreateSurveyResponseAction {
  type: typeof SurveyActionTypes.CREATE_SURVEY_RESPONSE;
  payload: {
    survey: ISurvey,
    userId: string,
  };
}

export function createSurveyResponse(survey: ISurvey, userId: string): CreateSurveyResponseAction {
  return {
    type: SurveyActionTypes.CREATE_SURVEY_RESPONSE,
    payload: {
      survey,
      userId,
    }
  };
}

/****************************************************************************************
  Begin Survey Response
****************************************************************************************/

export interface BeginSurveyResponseAction {
  type: typeof SurveyActionTypes.BEGIN_SURVEY_RESPONSE;
  payload: {
    survey: ISurvey,
  };
}

export function beginSurveyResponse(survey: ISurvey): BeginSurveyResponseAction {
  return {
    type: SurveyActionTypes.BEGIN_SURVEY_RESPONSE,
    payload: {
      survey,
    }
  };
}

/****************************************************************************************
  Go To Next Question
****************************************************************************************/

export interface GoToSurveyNextStepAction {
  type: typeof SurveyActionTypes.GO_TO_SURVEY_NEXT_STEP;
  payload: {
    survey: ISurvey,
  };
}

export function goToSurveyNextStep(survey: ISurvey): BeginSurveyResponseAction {
  return {
    type: SurveyActionTypes.GO_TO_SURVEY_NEXT_STEP,
    payload: {
      survey,
    }
  };
}

/****************************************************************************************
  Create Survey Step Response
****************************************************************************************/

export interface CreateSurveyStepResponseAction {
  type: typeof SurveyActionTypes.CREATE_SURVEY_STEP_RESPONSE;
  payload: {
    step: ISurveyStep,
    answers: ISurveyStepAnswer[]
  };
}

export function createSurveyStepResponse(step: ISurveyStep, answers: ISurveyStepAnswer[]): CreateSurveyStepResponseAction {
  return {
    type: SurveyActionTypes.CREATE_SURVEY_STEP_RESPONSE,
    payload: {
      step,
      answers,
    }
  };
}

export type SurveyActionCreatorTypes =
  | CreateSurveyResponseAction
  | BeginSurveyResponseAction
  | GoToSurveyNextStepAction
  | CreateSurveyStepResponseAction;