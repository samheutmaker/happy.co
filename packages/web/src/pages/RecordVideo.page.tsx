import React, { useState, useRef, useCallback } from "react";
import styled from "styled-components";
import * as Polished from "polished";
import { useMutation } from "@apollo/react-hooks";
import Webcam from "react-webcam";
import UPLOAD_FILES from '../graphql/mutations/uploadFiles.mutation';
import { Colors } from "../styles/Colors";
import Button, { ButtonTypes } from "../elements/Button";

interface RecordingOptions {}


interface AnswerOption {
  text: string;
  value: string | number;
  maxValue?: number;
  minValue?: number;
  minLength?: number;
  maxLength?: number;
}

interface Answer {
  options: AnswerOption[];
}

enum ESurveyStepType {
  AVRecording = 'Audio/Video Recording',
  QAOutloud = 'Question/Answer Outloud',
  InstructionsWithNextButton = 'InstructionsWithNextButton',
  MultipleChoiceQuestion = 'MultipleChoiceQuestion',
}

interface SurveyStep {
  type: ESurveyStepType;
  name: string;
  text: string;
  durationInSeconds?: number;
  steps?: SurveyStep[];
  answer?: Answer;
}

enum ESurveyType {
  Big5ExtraShort = 'Big 5 Extra Short',
}

interface Survey {
  type: ESurveyType;
  name: string;
  
  description: string;
  steps: SurveyStep[];
}

const big5ExtraShortSurvey: Survey = {
  type: ESurveyType.Big5ExtraShort,
  name: "Big 5 Extra Short",
  description: "A super short version of the Big 5 personality test",
  steps: [
    {
      type: ESurveyStepType.AVRecording,
      name: "Video Recording",
      text:
        "We are going to take a 30 second audio and video recording before the test begins, during which you will be asked 5 questions. Answer the questions out loud, and stay centered in the video as best you can.",
      durationInSeconds: 30,
      steps: [
        {
          type: ESurveyStepType.QAOutloud,
          name: "First Question",
          text: "What is your full name?",
          durationInSeconds: 6,
        },
        {
          type: ESurveyStepType.QAOutloud,
          name: "Second Question",
          text: "What is your date of birth?",
          durationInSeconds: 6,
        },
        {
          type: ESurveyStepType.QAOutloud,
          name: "Third Question",
          text: "What is your favorite food?",
          durationInSeconds: 6,
        },
        {
          type: ESurveyStepType.QAOutloud,
          name: "Fourth Question",
          text: "What is your favorite color?",
          durationInSeconds: 6,
        },
        {
          type: ESurveyStepType.QAOutloud,
          name: "Last Question",
          text: "What country do you live in?",
          durationInSeconds: 6,
        },
      ],
    },
    {
      type: ESurveyStepType.InstructionsWithNextButton,
      name: "Start Test Intro",
      text: "Great! You are ready to begin the final step.",
    },
    // Question 1
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #1",
      text: "I see myself as someone who is reserved.",
      answer: {
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
    },
    // Question 2
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #2",
      text: "I see myself as someone who is generally trusting.",
      answer: {
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
    },
    // Question 3
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #3",
      text: "I see myself as someone who is tends to be lazy.",
      answer: {
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
    },
    // Question 4
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #4",
      text: "I see myself as someone who is relaxed, handles stress well.",
      answer: {
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
    },
    // Question 5
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #5",
      text: "I see myself as someone who has few artistic interests.",
      answer: {
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
    },
    // Question 6
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #6",
      text: "I see myself as someone who is outgoing, sociable.",
      answer: {
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
    },
    // Question 7
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #7",
      text: "I see myself as someone who tends to find fault with others.",
      answer: {
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
    },
    // Question 8
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #8",
      text: "I see myself as someone who does a thorough job.",
      answer: {
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
    },
    // Question 9
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #9",
      text: "I see myself as someone who gets nervous easily.",
      answer: {
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
    },
    // Question 10
    {
      type: ESurveyStepType.MultipleChoiceQuestion,
      name: "Question #10",
      text: "I see myself as someone who has an active imagination.",
      answer: {
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
    },
  ],
};

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

type OverlayProps = {
  active: boolean;
};

const Overlay = styled.div<OverlayProps>`
  display: ${(props) => (props.active ? "flex" : "none")};
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${Polished.rgba(Colors.Black, 0.7)};
  z-index: 1000;
`;

const Message = styled.div`
  font-size: 1.8rem;
  line-height: 150%;
  color: ${Colors.White};
  width: 90%;

  @media screen and (min-width: 768px) {
    width: 400px;
  }
`;

const Count = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  font-size: 6rem;
  color: ${Colors.White};
  z-index: 2000;
`;



const VIDEO_LENGTH: number = 3;

function wait(delayInMS: number) {
  return new Promise((resolve) => setTimeout(resolve, delayInMS));
}

function convertObjectURLToFile(objectUrl: string) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", objectUrl);
    xhr.responseType = "blob"; 
    xhr.onload = function () {
      const blob = xhr.response;
      blob.lastModifiedDate = new Date();
      blob.name = "new";
      resolve(new File([blob], "recording.webm"));
    };
    xhr.send();
  });
}

type StartRecordingParams = {
  stream: MediaStream;
  length: number;
  onStart: () => Function;
  onInterval?: Function;
};

function startRecording(params: StartRecordingParams) {
  const { stream, length, onStart } = params;

  const options = { mimeType: "video/webm; codecs=vp9" };
  const recorder = new MediaRecorder(stream, options);
  const data: any[] = [];

  recorder.ondataavailable = (event: BlobEvent) => {
    data.push(event.data);
  };

  const onEnd = onStart();
  recorder.start();

  const stopped = new Promise((resolve, reject) => {
    recorder.onstop = () => {
      onEnd();
      resolve();
    };
    recorder.onerror = (event: MediaRecorderErrorEvent) => reject(event);
  });

  const recorded = wait(length).then(
    () => recorder.state === "recording" && recorder.stop()
  );

  return Promise.all([stopped, recorded]).then(() => data);
}

type RecordVideoProps = {};

const RecordVideo: React.FC<RecordVideoProps> = () => {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const webcamRef = useRef<any>(null);

  const [uploadFiles, { data, loading, error }] = useMutation(UPLOAD_FILES, {
    onCompleted: data => {
      console.log(data)
    },
    onError: error => console.error(error),
  });

  const record = useCallback(async () => {
    try {
      if (!webcamRef || !webcamRef.current) return;

      const video: any = webcamRef.current.video;
      const recordedChunks = await startRecording({
        stream: video.captureStream(),
        length: VIDEO_LENGTH * 1000,
        onStart: () => {
          setRecording(true);
          setSeconds(0);
          const interval = setInterval(() => {
            setSeconds((seconds) => seconds + 1);
          }, 1000);

          return () => {
            setRecording(false);
            setSeconds(0);
            clearInterval(interval);
          };
        },
      });

      const recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
      const videoURL = URL.createObjectURL(recordedBlob);
      const file = await convertObjectURLToFile(videoURL);
      uploadFiles({
        variables: {
          files: [file]
        }
      });
    } catch (e) {
      console.error(e);
    }
  }, [webcamRef]);

  return (
    <Container>
      <Overlay active={!recording}>
        <Message>
          Before we begin, we're going to take a 10 second video recording.
          Press the button below when you're ready.
          <br />
          <Button
            type={ButtonTypes.Submit}
            onClick={() => record()}
            loading={false}
            text="Begin Recording"
            margin="20px 0 0"
          />
        </Message>
      </Overlay>
      {recording && <Count>{seconds}</Count>}
      <Webcam
        audio={true}
        height={720}
        ref={webcamRef}
        videoConstraints={{ facingMode: "user" }}
      />
    </Container>
  );
};

export default RecordVideo;
