import React from "react";
import { connect, Field, getIn } from "formik";
import {
  string as yupString,
  number as yupNumber,
  object as yupObject,
  ObjectSchema
} from "yup";

export type CoverValues = {
  policy: string;
  noClaims: number;
};

export type CoverProps = {
  root: string;
};

export const coverSchema: ObjectSchema<CoverValues> = yupObject().shape({
  policy: yupString().min(6).max(16).required(),
  noClaims: yupNumber().moreThan(0).required()
});

export const initalCoverValues: CoverValues = {
  policy: "",
  noClaims: 0
};

const Cover = connect<CoverProps>(props => (
  <div className="Cover">
    <p>
      {getIn(props.formik.touched, props.root) !== undefined &&
      getIn(props.formik.errors, props.root) === undefined &&
      props.formik.dirty
        ? "Cover is Valid"
        : "Cover is Invalid"}
    </p>
    <label>
      Cover policy
      <Field
        type="text"
        placeholder="Enter policy"
        name={`${props.root}.policy`}
      />
    </label>
    <label>
      Cover no claims
      <Field
        type="number"
        placeholder="Enter years"
        name={`${props.root}.noClaims`}
      />
    </label>
  </div>
));

export default Cover;
