import { ErrorMessage, Field } from "formik";
import React from "react";
import * as Yup from "yup";
import WizardStep from "../../components/WizardStep";
import {
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonBadge,
  IonCol,
} from "@ionic/react";
import WrappedInput from "../../components/WrappedInput";
import QuestionExplainer from "../../components/QuestionExplainer";

export default function FirstStep() {
  return (
    <IonCol>
      <QuestionExplainer />
      <IonList style={{ width: "100%" }}>
        <IonItem>
          <IonLabel>First Name</IonLabel>
          <WrappedInput name="firstName" displayError={false} />
          <ErrorMessage
            className="error"
            component={IonBadge}
            name="firstName"
          />
        </IonItem>
        <IonItem>
          <IonLabel>Last Name</IonLabel>
          <WrappedInput name="lastName" displayError={false} />
          <ErrorMessage
            className="error"
            component={IonBadge}
            name="lastName"
          />
        </IonItem>
      </IonList>
    </IonCol>
  );
}
