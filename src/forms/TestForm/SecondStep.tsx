import { Field, ErrorMessage } from "formik";
import React, { useEffect, useRef, useState } from "react";
import WizardStep from "../../components/WizardStep";
import * as Yup from "yup";
import axios from "axios";
import { Button } from "react-bootstrap";
import { ReactMic } from "react-mic";
import TranscribeOutput from "../../pages/TranscribeOutput";
import { IonText, IonButton } from "@ionic/react";

export default function SecondStep() {
  const [transcribedData, setTranscribedData] = useState<any[]>([]);

  const [interimTranscribedData] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [selectedModel, setSelectedModel] = useState(1);
  const [transcribeTimeout, setTranscribeTimout] = useState(5);
  const [stopTranscriptionSession, setStopTranscriptionSession] =
    useState(false);

  // const intervalRef = useRef(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const stopTranscriptionSessionRef = useRef(stopTranscriptionSession);
  stopTranscriptionSessionRef.current = stopTranscriptionSession;

  const selectedLangRef = useRef(selectedLanguage);
  selectedLangRef.current = selectedLanguage;

  const selectedModelRef = useRef(selectedModel);
  selectedModelRef.current = selectedModel;

  const supportedLanguages = [
    "english",
    "chinese",
    "german",
    "spanish",
    "russian",
    "korean",
    "french",
    "japanese",
    "portuguese",
    "turkish",
    "polish",
    "catalan",
    "dutch",
    "arabic",
    "swedish",
    "italian",
    "indonesian",
    "hindi",
    "finnish",
    "vietnamese",
    "hebrew",
    "ukrainian",
    "greek",
    "malay",
    "czech",
    "romanian",
    "danish",
    "hungarian",
    "tamil",
    "norwegian",
    "thai",
    "urdu",
    "croatian",
    "bulgarian",
    "lithuanian",
    "latin",
    "maori",
    "malayalam",
    "welsh",
    "slovak",
    "telugu",
    "persian",
    "latvian",
    "bengali",
    "serbian",
    "azerbaijani",
    "slovenian",
    "kannada",
    "estonian",
    "macedonian",
    "breton",
    "basque",
    "icelandic",
    "armenian",
    "nepali",
    "mongolian",
    "bosnian",
    "kazakh",
    "albanian",
    "swahili",
    "galician",
    "marathi",
    "punjabi",
    "sinhala",
    "khmer",
    "shona",
    "yoruba",
    "somali",
    "afrikaans",
    "occitan",
    "georgian",
    "belarusian",
    "tajik",
    "sindhi",
    "gujarati",
    "amharic",
    "yiddish",
    "lao",
    "uzbek",
    "faroese",
    "haitian creole",
    "pashto",
    "turkmen",
    "nynorsk",
    "maltese",
    "sanskrit",
    "luxembourgish",
    "myanmar",
    "tibetan",
    "tagalog",
    "malagasy",
    "assamese",
    "tatar",
    "hawaiian",
    "lingala",
    "hausa",
    "bashkir",
    "javanese",
    "sundanese",
  ];

  const modelOptions = ["tiny", "base", "small", "medium", "large", "large-v1"];

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  function handleTranscribeTimeoutChange(
    newTimeout: React.SetStateAction<number>
  ) {
    setTranscribeTimout(newTimeout);
  }

  function startRecording() {
    setStopTranscriptionSession(false);
    setIsRecording(true);
    intervalRef.current = setInterval(
      transcribeInterim,
      transcribeTimeout * 1000
    );
  }

  function stopRecording() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    setStopTranscriptionSession(true);
    setIsRecording(false);
    setIsTranscribing(false);
  }

  function onData(recordedBlob: any) {
    // console.log('chunk of real-time data is: ', recordedBlob);
  }

  function onStop(recordedBlob: any) {
    transcribeRecording(recordedBlob);
    setIsTranscribing(true);
  }

  function transcribeInterim() {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
    }
    setIsRecording(false);
  }

  function transcribeRecording(recordedBlob: { blob: string | Blob }) {
    const headers = {
      "content-type": "multipart/form-data",
    };
    const formData = new FormData();
    formData.append("language", selectedLangRef.current);
    formData.append("model_size", modelOptions[selectedModelRef.current]);
    formData.append("audio_data", recordedBlob.blob, "temp_recording");
    axios
      .post("http://0.0.0.0:8000/transcribe", formData, { headers })
      .then((res) => {
        setTranscribedData((oldData) => [...oldData, res.data]);
        setIsTranscribing(false);
        intervalRef.current = setInterval(
          transcribeInterim,
          transcribeTimeout * 1000
        );
      });

    if (!stopTranscriptionSessionRef.current) {
      setIsRecording(true);
    }
  }

  return (
    <div>
      <div>
        {!isRecording && !isTranscribing && (
          <IonButton onClick={startRecording}>Start transcribing</IonButton>
        )}
        {(isRecording || isTranscribing) && (
          <IonButton
            onClick={stopRecording}
            disabled={stopTranscriptionSessionRef.current}
          >
            Stop
          </IonButton>
        )}
      </div>
      <div>
        <ReactMic
          record={isRecording}
          className="sound-wave"
          onStop={onStop}
          onData={onData}
          strokeColor="#0d6efd"
          backgroundColor="#f6f6ef"
        />
      </div>
      <div>
        <TranscribeOutput
          transcribedText={transcribedData}
          interimTranscribedText={interimTranscribedData}
        />
        {/* <PulseLoader sizeUnit={"px"} size={20} color="purple" loading={isTranscribing} /> */}
      </div>
    </div>
  );
}
