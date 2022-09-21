import React from "react";

function Loader(props) {
  const { className } = props;
  return (
    <div
      className={`swal2-actions swal2-loading ${className}`}
      style={{ display: "flex" }}
    >
      <div
        type="button"
        className="swal2-confirm swal2-styled"
        aria-label=""
        style={{
          display: "flex",
          borderLeftColor: "rgb(85, 110, 230)",
          borderRightColor: "rgb(85, 110,230)",
        }}
        disabled=""
      ></div>
    </div>
  );
}

export default Loader;
