import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { string as yupString, object as yupObject, ObjectSchema } from "yup";

import Home, { HomeValues, homeSchema, initalHomeValues } from "./Home";

import Cover, { CoverValues, coverSchema, initalCoverValues } from "./Cover";

import TitleBar from "./TitleBar";

const HOME: "home" = "home";
const COVER: "cover" = "cover";

type Values = {
  name: string;
  [HOME]: HomeValues;
  [COVER]: CoverValues;
};

const schema: ObjectSchema<Values> = yupObject().shape({
  name: yupString()
    .min(3)
    .required(),
  [HOME]: homeSchema,
  [COVER]: coverSchema
});

const initalValues: Values = {
  name: "",
  [HOME]: initalHomeValues,
  [COVER]: initalCoverValues
};

const FormTest = () => {
  const [submitTime, setSubmitTime] = useState(0);

  return (
    <Formik
      onSubmit={(_, actions) => {
        const countDown = (st: number) => {
          setSubmitTime(st);
          if (st === 0) {
            actions.setSubmitting(false);
          } else {
            setTimeout(() => countDown(st - 1), 1000);
          }
        };

        countDown(3);
      }}
      initialValues={initalValues}
      validationSchema={schema}
      validateOnChange={true}
      validateOnBlur={false}
    >
      {({ isValid, isSubmitting, errors, touched, dirty }) => {

        // Alway check these 3 values to determene the validity of a sub section
        const subIsValid = (idx: typeof HOME | typeof COVER) => 
          dirty && touched[idx] !== undefined && errors[idx] === undefined;
        return (
          <Form>
            <label>
              Name <Field type="text" placeholder="Enter name" name="name" />
            </label>
            <TitleBar
              title="Home"
              isValid={subIsValid(HOME)}
            >
              <Home root={HOME} />
            </TitleBar>
            <TitleBar
              title="Cover"
              isValid={subIsValid(COVER)}
            >
              <Cover root={COVER} />
            </TitleBar>
            <button type="submit" disabled={!isValid || isSubmitting}>
              Submit
            </button>
            {submitTime !== 0 && isSubmitting ? (
              <p>Submit finishing in {submitTime} seconds...</p>
            ) : null}
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormTest;
