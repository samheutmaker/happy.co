import React, { useEffect } from "react";
import styled from "styled-components";
import * as Polished from "polished";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSelector, useDispatch } from 'react-redux';
import * as SurveyActions from '../redux/actions/survey.actions';
import { Colors } from "../styles/Colors";
import Button, { ButtonTypes } from "../elements/Button";
import ISurveyResponse from '../models/interfaces/ISurveyResponse';
import { HappyState } from "../redux/store";
import ISurveyStep from "../models/interfaces/ISurveyStep";
import ISurveyStepResponse from "../models/interfaces/ISurveyStepResponse";
import ESurveyStepType from '../models/enums/ESurveyStepType';
import ESurveyStepAnswerType from '../models/enums/ESurveyStepAnswerType';
import ISurveyStepAnswer from "../models/interfaces/ISurveyStepAnswer";

const Container = styled.div`
  
`;

const Name = styled.div`
  font-size: 1.6rem;
  font-weight: 400;
  margin-bottom: 10px;
`;

const Text = styled.div`
  font-size: 2.2rem;
  font-weight: 600;
  margin-bottom: 20px;
`;

const OptionsContainer = styled.div`
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Option = styled.div`
  min-height: 40px;
  border: 2px solid ${Colors.Blue};
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  padding: 0 10px;
`;

const OptionValue = styled.div`
  justify-content: center;
  text-align: center;
`;

type MultipleChoiceQuestionProps = {
  step: ISurveyStep;
};

const MultipleChoiceQuestion: React.FC<MultipleChoiceQuestionProps> = ({ step }) => {
  const dispatch = useDispatch();
  const createSurveyStepResponse = (step: ISurveyStep, answers: ISurveyStepAnswer[]) => 
    dispatch(SurveyActions.createSurveyStepResponse(step, answers));
  
  return (
    <Container>
      <Name>
        {step.name}
      </Name>
      <Text>
        {step.text}
      </Text>
      {(() => {
        if (!step.options) return null;

        return (
          <OptionsContainer>
            {step.options.map((option, index) => {
              return (
                <Option 
                  key={index} 
                  onClick={() => createSurveyStepResponse(
                    step,
                    [
                      {
                        type: ESurveyStepAnswerType.Number,
                        text: option.text,
                        value: option.value,
                      },
                    ]
                  )}
                >
                  <OptionValue>{option.value}&nbsp;{option.text}</OptionValue>
                </Option>
              );
            })}
          </OptionsContainer>
        );
      })()}
    </Container>
  );
}

export default MultipleChoiceQuestion;
