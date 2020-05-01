import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import * as Polished from "polished";
import { useMutation } from "@apollo/react-hooks";
import Webcam from "react-webcam";
import UPLOAD_FILES from '../graphql/mutations/uploadFiles.mutation';
import { Colors } from "../styles/Colors";
import Button, { ButtonTypes } from "../elements/Button";


const Container = styled.div`
  border-radius: 5px;
  overflow: hidden;

  video {
    position: absolute;
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;


type SurveyProps = {};

const Survey: React.FC<SurveyProps> = () => {
  return (
    <Container>
      
    </Container>
  );
};

export default Survey;
