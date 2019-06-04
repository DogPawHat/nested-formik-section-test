import React from "react";

type Props = {
  title: string;
  isValid: boolean;
  children: React.ReactChild;
};

const TitleBar = ({ title, isValid, children }: Props) => (
  <div className="TitleBar">
    <header className="TitleBar__header">
      <h1 className="TitleBar__title">
        {title}: {isValid ? "Valid" : "Invalid"}
      </h1>
    </header>
    {children}
  </div>
);

export default TitleBar;
