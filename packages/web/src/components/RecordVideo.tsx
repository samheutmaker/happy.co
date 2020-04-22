import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import Webcam from "react-webcam";
import * as Polished from 'polished';
import { Colors } from "../styles/Colors";
import Button, { ButtonTypes } from './../elements/Button';

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
  display: ${props => props.active ? 'flex' : 'none'};
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
  width: 400px;

`;

const Count = styled.div`
  position: absolute;
  bottom: 15px;
  left: 15px;
  font-size: 6rem;
  color: ${Colors.White};
  z-index: 2000;
`;

type RecordVideoProps = {};

const VIDEO_LENGTH: number = 3;


const RecordVideo: React.FC<RecordVideoProps> = () => {
  const [recording, setRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const webcamRef = React.useRef(null);
  const record = React.useCallback(() => {
    setRecording(true);

    const canvas = (webcamRef.current as any).getCanvas();
    const stream = canvas.captureStream(25);
    const recordedChunks: Blob[] = [];
    const options = { mimeType: "video/webm; codecs=vp9" };
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.ondataavailable = (event) => {
      console.log("DATA AVAILABLE");
      if (event.data.size > 0) {
        console.log(event.data);
        console.log(event.data.size);
        recordedChunks.push(event.data);
        const blob = new Blob(recordedChunks, {
          type: "video/webm",
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        document.body.appendChild(a);
        a.href = url;
        a.download = "test.webm";
        a.click();
        // window.URL.revokeObjectURL(url);
      } else {
        console.error('There was an error: No event data');
      }
    };

    mediaRecorder.start();

    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);
    
    setTimeout(() => {
      setRecording(false);
      setSeconds(0);
      mediaRecorder.stop();
      clearInterval(interval);
    }, VIDEO_LENGTH*1000);

  },[webcamRef]);

  return (
    <Container>
      <Overlay active={!recording}>
        <Message>
          Before we begin, we're going to take a 10 second video recording.
          Press the button below when you're ready.
          <br/>
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
        audio={false}
        height={720}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={1280}
        videoConstraints={{ facingMode: "user" }}
      />
    </Container>
  );
}

export default RecordVideo;
