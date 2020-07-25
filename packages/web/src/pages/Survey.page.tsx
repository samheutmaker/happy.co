import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useSelector, useDispatch, connect } from 'react-redux';
import * as SurveyActions from '../redux/actions/survey.actions';
import Big5 from '../models/interfaces/surveys/BigFiveExtraShort';
import ISurvey from '../models/interfaces/ISurvey';
import USER from '../graphql/queries/user.query';
import { HappyState } from "../redux/store";
import ESurveyStepType from '../models/enums/ESurveyStepType';
import MultipleChoiceQuestion from '../components/MultipleChoiceQuestion';
import SurveyUtil from "../utils/SurveyUtil";
import Loader from "../elements/Loader";
import Button, { ButtonTypes } from '../elements/Button';

const Container = styled.div`
  position: relative;
  width: 90%;
  max-width: 800px;
  margin: 0 auto;
`;

type SurveyProps = {};

const Survey: React.FC<SurveyProps> = () => {
  const currentStepCoordinates = useSelector((state: HappyState) => state.survey.currentStepCoordinates);
  const startTime = useSelector((state: HappyState) => state.survey.startTime);

  console.log(currentStepCoordinates)

  console.log('RE_RENDERED')
  const currentStep = SurveyUtil.getStep(Big5.steps, currentStepCoordinates);

  const dispatch = useDispatch();

  const createSurvey = (survey: ISurvey, userId: string) => 
    dispatch(SurveyActions.createSurveyResponse(survey, userId));

  const beginSurvey = (survey: ISurvey) =>
    dispatch(SurveyActions.beginSurveyResponse(survey));

  const goToNextQuestion = (survey: ISurvey) =>
    dispatch(SurveyActions.goToSurveyNextStep(survey));


  const { data: userData, loading, error} = useQuery(USER);

  useEffect(() => {
    if(Big5 && userData && userData.user._id) {
      createSurvey(Big5, userData.user._id);
      beginSurvey(Big5);
    }
  }, [userData])


  return (
    <Container>
      {startTime}
      {(() => {
        if(!currentStep) return <div>no current step</div>

        switch(currentStep.type) {
          case ESurveyStepType.MultipleChoiceQuestion:
            return (
              <MultipleChoiceQuestion 
                step={currentStep}
              />
            );
        }
      })()}
      <Button
        type={ButtonTypes.Submit}
        onClick={() => goToNextQuestion(Big5)}
        text="Next Question"
        margin="20px 0 0"
      />
    </Container>
  );
};

export default Survey;
