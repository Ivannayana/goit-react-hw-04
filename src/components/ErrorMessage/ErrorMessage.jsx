import React from "react";
import css from "../ErrorMessage/ErrorMessage.module.css";

const ErrorMessage = ({ message }) => (
  <div className={css.error}>{message}</div>
);

export default ErrorMessage;
