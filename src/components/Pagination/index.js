import React from "react";
import "./style.css";
import {
  faChevronLeft,
  faChevronRight,
  faAngleDoubleLeft,
  faAngleDoubleRight,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//pagination component
export default function Pagination(props) {
  //props passed to this component
  const { total, perPageRecords, onPageChange, currentPage } = props;
  //logic to calculate no of pages
  const noOfPages = Math.ceil(total / perPageRecords);

  //render page no buttons
  function renderPageNos() {
    let buttons = [];
    for (let i = 1; i < noOfPages + 1; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={
            currentPage === i
              ? "pagination-button current-pagination-button"
              : "pagination-button"
          }
        >
          {i}
        </button>
      );
    }
    return buttons;
  }
  //render pagination component
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        <FontAwesomeIcon icon={faAngleDoubleLeft} />
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      {renderPageNos()}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === noOfPages}
        className="pagination-button"
      >
        <FontAwesomeIcon icon={faChevronRight} />
      </button>
      <button
        onClick={() => onPageChange(noOfPages)}
        disabled={currentPage === noOfPages}
        className="pagination-button"
      >
        <FontAwesomeIcon icon={faAngleDoubleRight} />
      </button>
    </div>
  );
}
