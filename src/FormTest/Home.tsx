import React from "react";
import { connect, Field, getIn } from "formik";
import { string as yupString, object as yupObject, ObjectSchema } from "yup";

export type HomeValues = {
  address: string;
};

export type HomeProps = {
  root: string;
};

export const homeSchema: ObjectSchema<HomeValues> = yupObject().shape({
  address: yupString().min(8).max(30).required()
});

export const initalHomeValues: HomeValues = {
  address: ""
};

const Home = connect<HomeProps>(props => (
  <div className="Home">
    <p>
      {getIn(props.formik.touched, props.root) !== undefined &&
      getIn(props.formik.errors, props.root) === undefined &&
      props.formik.dirty
        ? "Home is Valid"
        : "Home is Invalid"}
    </p>
    <label>
      Home address
      <Field
        type="text"
        placeholder="Enter name"
        name={`${props.root}.address`}
      />
    </label>
  </div>
));

export default Home;
