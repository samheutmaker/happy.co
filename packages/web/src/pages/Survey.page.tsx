import React, { useEffect } from "react";
import styled from "styled-components";
import * as Polished from "polished";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSelector, useDispatch } from 'react-redux';
import * as SurveyActions from '../redux/actions/survey.actions';
import { Colors } from "../styles/Colors";
import Button, { ButtonTypes } from "../elements/Button";
import Big5 from '../models/interfaces/surveys/BigFiveExtraShort';
import ISurvey from '../models/interfaces/ISurvey';
import ISurveyResponse from '../models/interfaces/ISurveyResponse';
import USER from '../graphql/queries/user.query';
import { HappyState } from "../redux/store";

const Container = styled.div`

`;

type SurveyProps = {};

const Survey: React.FC<SurveyProps> = () => {
  const currentStepIndex = useSelector((state: HappyState) => state.survey.currentStepIndex);

  const dispatch = useDispatch();

  const createSurvey = (survey: ISurvey, userId: string) => 
    dispatch(SurveyActions.createSurveyResponse(survey, userId));

  const beginSurvey = (survey: ISurvey) =>
    dispatch(SurveyActions.beginSurveyResponse(survey));
  

  const { data: userData, loading, error} = useQuery(USER);

  useEffect(() => {
    if(Big5 && userData && userData.user._id) {
      createSurvey(Big5, userData.user._id);
      beginSurvey(Big5);      
    }
  }, [userData])


  return (
    <Container>

    </Container>
  );
};

export default Survey;
