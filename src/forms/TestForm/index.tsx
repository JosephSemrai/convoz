import React, { ReactElement, useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import { IonButton, IonCol, IonRow } from "@ionic/react";
import { Line } from "rc-progress";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

type TestValues = {
  firstName: string;
  lastName: string;
};

const initialValues: TestValues = {
  firstName: "",
  lastName: "",
};

const WizardStep = ({
  children,
  onSubmit,
  validationSchema,
}: {
  children: any;
  onSubmit: any;
  validationSchema: any;
}) => children;

// Wizard is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.
const Wizard = ({
  children,
  initialValues,
  onSubmit,
}: {
  children: any;
  initialValues: TestValues;
  onSubmit: (values: TestValues, bag: any) => void;
}) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber] as ReactElement<any>;
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: TestValues) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values: TestValues) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  const handleSubmit = async (values: TestValues, bag: any) => {
    if (step.props.onSubmit) {
      await step.props.onSubmit(values, bag);
    }
    if (isLastStep) {
      return onSubmit(values, bag);
    } else {
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {(formik) => (
        <Form
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {stepNumber > 0 && (
            <IonButton
              onClick={() => previous(formik.values)}
              type="button"
              fill="clear"
            >
              {"<"} Back
            </IonButton>
          )}
          <Line
            percent={(steps.indexOf(step) / steps.length) * 100}
            className="pad-b"
          />

          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            {step}
          </div>

          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <IonButton
              disabled={formik.isSubmitting}
              type="submit"
              expand="full"
              style={{ width: "100%", height: "80px" }}
            >
              {isLastStep ? "Submit" : "Next"}
            </IonButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const TestForm = () => (
  <Wizard
    initialValues={initialValues}
    onSubmit={async (values) =>
      sleep(300).then(() => console.log("Wizard submit", values))
    }
  >
    {/* IMPORTANT: WizardSteps cannot be abstracted into their own components. This will cause validation to stop working. */}

    {/* First Step */}
    <WizardStep
      onSubmit={() => console.log("Step1 onSubmit")}
      validationSchema={Yup.object({
        firstName: Yup.string().required("required"),
        lastName: Yup.string().required("required"),
      })}
    >
      <FirstStep />
    </WizardStep>

    {/* Second Step */}
    <WizardStep
      onSubmit={() => console.log("Step2 onSubmit")}
      validationSchema={Yup.object({
        email: Yup.string().email("Invalid email address").required("required"),
      })}
    >
      <SecondStep />
    </WizardStep>
  </Wizard>
);

export default TestForm;
