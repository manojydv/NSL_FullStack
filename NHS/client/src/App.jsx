import React, { useState, useEffect, useRef } from 'react';

function App() {
  // State variables
  const [translatedText, setTranslatedText] = useState('Waiting for translation...');
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [recognition, setRecognition] = useState(null);
  
  const videoRef = useRef(null);

  // Start camera function
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error('Error accessing the camera: ', err);
    }
  };

  // Simulate sign language translation
  useEffect(() => {
    const interval = setInterval(() => {
      const simulatedTranslation = 'Hello!';
      setTranslatedText(simulatedTranslation);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Text-to-speech function
  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleConvertText = () => {
    if (inputText.trim() !== '') {
      speakText(inputText);
    } else {
      alert('Please enter some text to convert to speech.');
    }
  };

  // Initialize speech-to-text (speech recognition)
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const speechRecognition = new SpeechRecognition();
      speechRecognition.continuous = true;
      speechRecognition.interimResults = true;
      speechRecognition.lang = 'en-US';

      speechRecognition.onresult = (event) => {
        let interimTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptSegment = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscript((prevTranscript) => prevTranscript + transcriptSegment);
          } else {
            interimTranscript += transcriptSegment;
          }
        }
      };

      speechRecognition.onerror = (event) => {
        console.error('Speech recognition error detected: ' + event.error);
      };

      setRecognition(speechRecognition);
    } else {
      console.error('Your browser does not support Speech Recognition.');
      alert('Speech Recognition API is not supported in this browser. Please use Google Chrome.');
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setIsListening(true);
      recognition.start();
      setTranscript('Listening...');
    }
  };

  const stopListening = () => {
    if (recognition) {
      setIsListening(false);
      recognition.stop();
      setTranscript((prev) => prev + ' Stopped Listening.');
    }
  };

  return (
    <div style={styles.container}>
      {/* Camera Section */}
      <div style={styles.content}>
        <div style={styles.videoContainer}>
          <video ref={videoRef} style={styles.video} autoPlay playsInline></video>
          <button onClick={startCamera} style={styles.button}>
            Start Camera
          </button>
        </div>

        {/* Translated Text Section */}
        <div style={styles.output}>
          <h2 style={styles.subheading}>Translated Text</h2>
          <p style={styles.translatedText}>{translatedText}</p>
          <button onClick={() => speakText(translatedText)} style={styles.speakButton}>
            Speak Translated Text
          </button>
        </div>

        {/* Text-to-Speech Input Section */}
        <div style={styles.textToSpeech}>
          <h2 style={styles.subheading}>Convert Your Text to Speech</h2>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            style={styles.input}
            placeholder="Type your text here..."
          />
          <button onClick={handleConvertText} style={styles.convertButton}>
            Convert to Speech
          </button>
        </div>

        {/* Speech-to-Text Section */}
        <div className="container">
          <h4>Speech to Text Converter</h4>
          <button className="btn" onClick={startListening} disabled={isListening}>
            Start Listening
          </button>
          <button className="btn" onClick={stopListening} disabled={!isListening}>
            Stop Listening
          </button>
          <p className="output">{transcript}</p>
        </div>
      </div>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>&copy; 2024 Sign Language Translator</p>
      </footer>
    </div>
  );
}

// Styles
const styles = {
  container: {
    fontFamily: 'Poppins, sans-serif',
    color: '#333',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    padding: '20px',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  videoContainer: {
    width: '640px',
    height: '480px',
    marginBottom: '30px',
    position: 'relative',
  },
  video: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    borderRadius: '10px',
  },
  button: {
    marginTop: '15px',
    padding: '12px 25px',
    fontSize: '1.1em',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  output: {
    marginTop: '30px',
    marginBottom: '40px',
    textAlign: 'center',
  },
  subheading: {
    fontSize: '1.8em',
    color: '#444',
    marginBottom: '10px',
  },
  translatedText: {
    fontSize: '1.6em',
    color: '#28a745',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  speakButton: {
    padding: '10px 20px',
    fontSize: '1.1em',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  textToSpeech: {
    marginBottom: '50px',
  },
  input: {
    width: '80%',
    padding: '15px',
    fontSize: '1.2em',
    marginBottom: '20px',
    border: '2px solid #007bff',
    borderRadius: '8px',
  },
  convertButton: {
    padding: '12px 25px',
    fontSize: '1.2em',
    backgroundColor: '#ffc107',
    color: '#333',
    border: 'none',
    borderRadius: '8px',
  },
  footer: {
    marginTop: '40px',
    fontSize: '0.9em',
    color: '#666',
  },
};

export default App;
