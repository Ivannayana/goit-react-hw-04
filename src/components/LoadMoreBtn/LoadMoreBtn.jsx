import React from "react";
import css from "../LoadMoreBtn/LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => (
  <button className={css.loadMoreBtn} onClick={onClick}>
    Load more
  </button>
);

export default LoadMoreBtn;
