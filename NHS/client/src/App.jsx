import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [translatedText, setTranslatedText] = useState("Waiting for input...");

  useEffect(() => {
    const video = document.querySelector("#cameraFeed");

    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          video.srcObject = stream;
        })
        .catch((err) => {
          console.log("Something went wrong with accessing the camera: ", err);
        });
    }

    // Placeholder for the function that processes camera feed
    // and updates the translated text
    const processCameraFeed = () => {
      

      setTranslatedText("model is not connected for now");
    };

    //Trigger translation every 1 seconds
    const interval = setInterval(processCameraFeed, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app">
      <div className="camera-container">
        <video id="cameraFeed" autoPlay></video>
      </div>
      <div className="text-display">
        {translatedText}
      </div>
    </div>
  );
};

export default App;
