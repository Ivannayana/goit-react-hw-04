import React from "react";
import { Audio } from "react-loader-spinner";
import css from "../Loader/Loader.module.css";

const Loader = () => (
  <div className={css.loader}>
    <Audio height="80" width="80" color="black" ariaLabel="loading" />
  </div>
);

export default Loader;
