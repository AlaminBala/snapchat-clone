import React, { useCallback, useRef } from "react";
import "./WebcamCapture.css";
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCameraImage } from "./features/cameraSlice";

const videoConstraints = {
  width: 250,
  height: 400,
  facingMode: "user",
};

function WebcamCapture() {
  // const [image, setImage] = useState(null);
  const webcamRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log(imageSrc);
    // setImage(imageSrc);
    dispatch(setCameraImage(imageSrc));
    history.push("/preview");
  }, [webcamRef, history, dispatch]);
  return (
    <div className="webcamCapture">
      <Webcam
        audio={false}
        height={videoConstraints.height}
        width={videoConstraints.width}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={videoConstraints}
      />
      <RadioButtonUncheckedIcon
        className="webcamCapture__button"
        onClick={capture}
        fontSize="large"
      />
    </div>
  );
}

export default WebcamCapture;
