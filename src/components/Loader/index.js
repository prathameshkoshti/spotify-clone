import React from "react";
import "./style.css";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function index() {
  return (
    <div className="loader">
      <FontAwesomeIcon icon={faSpinner} size="lg" />
    </div>
  );
}
