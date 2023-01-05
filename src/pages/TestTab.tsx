import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from "@ionic/react";
import React from "react";
import TestForm from "../forms/TestForm/index";

export default function TestTab() {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Administer Test</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Tab 2</IonTitle>
          </IonToolbar>
        </IonHeader>
        <TestForm />
      </IonContent>
    </IonPage>
  );
}
