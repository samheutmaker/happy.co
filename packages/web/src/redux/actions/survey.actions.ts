import Partial from "../../models/interfaces/Partial";
import ISurvey from '../../models/interfaces/ISurvey';
import ISurveyResponse from '../../models/interfaces/ISurveyResponse';

export const SurveyActionTypes = {
  CREATE_SURVEY_RESPONSE: "CREATE_SURVEY_RESPONSE",
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

export type SurveyActionCreatorTypes =
  | CreateSurveyResponseAction
