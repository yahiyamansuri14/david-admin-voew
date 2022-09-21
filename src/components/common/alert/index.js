// import React from "react";
// import { useSelector } from "react-redux";
// import Success from "../../../assets/alerticons/success";
// import Error from "../../../assets/alerticons/error";
// import Loader from "../../../assets/alerticons/loader";
// import Confirm from "../../../assets/alerticons/confirm";

// function AlertBox(props) {
//   const { open, message, type, onOk, onCancel, data } = useSelector(
//     (store) => store.app.alert
//   );
//   const t = useTranslator();
//   return (
//     open && (
//       <div
//         className="swal2-container swal2-center swal2-shown"
//         style={{ overflowY: "auto" }}
//       >
//         <div
//           aria-labelledby="swal2-title"
//           aria-describedby="swal2-content"
//           className="swal2-popup swal2-modal swal2-shown"
//           tabIndex="-1"
//           role="dialog"
//           aria-live="assertive"
//           aria-modal="true"
//           style={{ display: "flex" }}
//         >
//           <div className="swal2-header">
//             {type === "success" && <Success />}
//             {type === "confirm" && <Confirm />}
//             {type === "error" && <Error />}
//             {/* {type === "csv" && <FileDownload />} */}
//             <h2
//               className="swal2-title"
//               id="swal2-title"
//               style={{ display: "flex" }}
//             >
//               {t(message)}
//             </h2>
//           </div>

//           {type === "loading" && <Loader />}

//           {type !== "loading" && (
//             <div className="swal2-actions">
//               {onOk && (
//                 <button
//                   type="button"
//                   className="swal2-confirm btn btn-primary ml-2 mt-2"
//                   style={{
//                     display: "inline-block",
//                   }}
//                   onClick={onOk}
//                 >
//                   {t(
//                     type === "confirm"
//                       ? "Confirm"
//                       : type === "success"
//                       ? "Done"
//                       : "OK"
//                   )}
//                 </button>
//               )}
//               {onCancel && (
//                 <button
//                   type="button"
//                   className="sswal2-cancel btn btn-danger ml-2 mt-2"
//                   style={{
//                     display: "inline-block",
//                   }}
//                   onClick={onCancel}
//                 >
//                   {t("Cancel")}
//                 </button>
//               )}
//               {/* {type === "csv" && (
//                 <CSVLink
//                   data={data.fileData}
//                   filename={`${data.filename}.csv`}
//                   headers={data.fileHeaders}
//                   onClick={onDownload}
//                 >
//                   <button
//                     className="swal2-confirm btn btn-primary ml-2 mt-2"
//                     style={{
//                       display: "inline-block",
//                     }}
//                   >
//                     {t("Download")}
//                   </button>
//                 </CSVLink>
//               )} */}
//             </div>
//           )}
//         </div>
//       </div>
//     )
//   );
// }

// export default AlertBox;
