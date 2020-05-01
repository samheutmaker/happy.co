import Partial from "../../models/interfaces/Partial";
import {
  SurveyActionTypes,
  SurveyActionCreatorTypes,
  CreateSurveyResponseAction,
} from "../actions/survey.actions";
import ISurvey from '../../models/interfaces/ISurvey';
import ISurveyResponse from '../../models/interfaces/ISurveyResponse';


function surveyResponseState(survey: ISurvey, userId: string): ISurveyResponse {
  return {
    type: survey.type,
    userId: '',
    surveyId: survey._id as string,
    responses: [],
  };
};

type SurveyReducerState = {
  surveyResponse: ISurveyResponse | null;

};

function surveyReducerState(): SurveyReducerState {
  return {
    surveyResponse: null,
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

    default:
      return state;
  }
}

/****************************************************************************************
  Update Create Order Params
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
