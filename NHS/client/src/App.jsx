import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [translatedText, setTranslatedText] = useState('Waiting for translation...');
  const [inputText, setInputText] = useState('');
  const videoRef = useRef(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (err) {
      console.error("Error accessing the camera: ", err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const simulatedTranslation = 'Hello!';
      setTranslatedText(simulatedTranslation);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

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

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>Sign Language Translator</h1>
        <p style={styles.subtitle}>With Real-Time Text-to-Speech</p>
      </header>

      <div style={styles.content}>
        <div style={styles.videoContainer}>
          <video ref={videoRef} style={styles.video} autoPlay playsInline></video>
          <button onClick={startCamera} style={styles.button}>
            Start Camera
          </button>
        </div>

        <div style={styles.output}>
          <h2 style={styles.subheading}>Translated Text</h2>
          <p style={styles.translatedText}>{translatedText}</p>
          <button onClick={() => speakText(translatedText)} style={styles.speakButton}>
            Speak Translated Text
          </button>
        </div>

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
      </div>

      <footer style={styles.footer}>
        <p>&copy; 2024 Sign Language Translator</p>
      </footer>
    </div>
  );
}

const styles = {

  
    container: {
      fontFamily: 'Poppins, sans-serif',
      color: '#333',
      backgroundColor: '#FF5733', 
      textAlign: 'center',
      padding: '20px',
      minHeight: '100vh', 
    
  

  container: {
    fontFamily: 'Poppins, sans-serif',
    color: '#333',
    backgroundColor: '#f9f9f9',
    textAlign: 'center',
    padding: '20px',
  },
  header: {
    marginBottom: '30px',
    color: '#0056b3',
  },
  title: {
    fontSize: '3em',
    fontWeight: 'bold',
    color: '#007bff',
  },
  subtitle: {
    fontSize: '1.2em',
    color: '#555',
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
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#218838',
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
    transition: 'background-color 0.3s',
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
    outline: 'none',
  },
  convertButton: {
    padding: '12px 25px',
    fontSize: '1.2em',
    backgroundColor: '#ffc107',
    color: '#333',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  footer: {
    marginTop: '40px',
    fontSize: '0.9em',
    color: '#666',
  },
}
};
export default App;
