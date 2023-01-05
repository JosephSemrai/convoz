import { Field } from "formik";
import React from "react";
import { IonInput } from "@ionic/react";

export default function WrappedInput({
  name,
  displayError = true,
  ...props
}: {
  name: string;
  displayError?: boolean;
}) {
  return (
    <Field name={name}>
      {({
        field, // { name, value, onChange, onBlur }
        form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
        meta,
      }: any) => (
        <div>
          <IonInput
            {...props}
            name={field.name}
            value={field.value}
            onIonChange={field.onChange}
            onIonBlur={field.onBlue}
          />
          {displayError && meta.touched && meta.error && (
            <div className="error">{meta.error}</div>
          )}
        </div>
      )}
    </Field>
  );
}
