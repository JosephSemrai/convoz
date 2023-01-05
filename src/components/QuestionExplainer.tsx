import { IonCol, IonText, IonTitle } from "@ionic/react";
import React from "react";
import animationData from "../lotties/language_animation.json";
import Lottie from "lottie-react";

export default function QuestionExplainer() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Lottie
        animationData={animationData}
        loop={true}
        style={{ height: "250px" }}
      />
      <div
        style={{ maxWidth: "300px", textAlign: "center", marginBottom: "20px" }}
      >
        <div style={{ marginBottom: "12px" }}>
          <IonText
            style={{
              marginBottom: "20px",
              fontSize: "24px",
              fontWeight: "bold",
            }}
          >
            Hi, TestName!
            <br />
            Welcome to the future of language learning.
          </IonText>
        </div>

        <IonText>We just have a few questions to ask you.</IonText>
      </div>
    </div>
  );
}
