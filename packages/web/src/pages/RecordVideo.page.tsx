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
