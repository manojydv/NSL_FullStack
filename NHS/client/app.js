// Check if browser supports speech recognition
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition;

if (SpeechRecognition) {
  recognition = new SpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = 'en-US';

  const startBtn = document.getElementById('start-btn');
  const stopBtn = document.getElementById('stop-btn');
  const output = document.getElementById('output');

  let isListening = false;

  // Start listening
  startBtn.addEventListener('click', () => {
    if (!isListening) {
      recognition.start();
      isListening = true;
      output.innerHTML = 'Listening...';
    }
  });

  // Stop listening
  stopBtn.addEventListener('click', () => {
    if (isListening) {
      recognition.stop();
      isListening = false;
      output.innerHTML += '<br><strong>Stopped Listening.</strong>';
    }
  });

  // When recognition gets a result
  recognition.onresult = (event) => {
    let interimTranscript = '';
    for (let i = event.resultIndex; i < event.results.length; i++) {
      const transcript = event.results[i][0].transcript;
      if (event.results[i].isFinal) {
        output.innerHTML += transcript;
      } else {
        interimTranscript += transcript;
      }
    }
  };

  // Handle errors
  recognition.onerror = (event) => {
    console.error('Speech recognition error detected: ' + event.error);
  };

} else {
  console.error('Your browser does not support Speech Recognition.');
  alert('Speech Recognition API is not supported in this browser. Please use Google Chrome.');
}
