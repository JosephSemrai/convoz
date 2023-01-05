import React from "react";

const TranscribeOutput = ({
  transcribedText,
  interimTranscribedText,
}: {
  transcribedText: any[]; //todo: fix this type
  interimTranscribedText: string;
}) => {
  if (transcribedText.length === 0 && interimTranscribedText.length === 0) {
    return <p>...</p>;
  }

  return (
    <div>
      <p>{transcribedText}</p>
      <p>{interimTranscribedText}</p>
    </div>
  );
};

export default TranscribeOutput;
